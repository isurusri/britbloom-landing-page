import { CreateTextureInfo } from "twgl.js";
import { Kernel, Program, FTrangle } from "../src/lib/fluidsim";

const vs = `
	attribute vec2 position;

	varying vec2 vUv;

	void main() {
		vUv = position * .5 + .5;
		gl_Position = vec4(position, 0.0, 1.0);
	}
`;

const fs = `
	#extension GL_OES_standard_derivatives : enable

	#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
	#else
	precision mediump float;
	#endif

	varying vec2 vUv;

	struct Texture {
		sampler2D texture;
		vec2 repeat;
		vec2 offset;
	};

	uniform Texture textures[1];
	uniform sampler2D pressure;

	vec3 computeNormalDeriv(sampler2D pressure, vec2 uv) {
	    float h = texture2D(pressure, uv).r;

	    float dx = dFdx(h);
	    float dy = dFdy(h);

	    vec3 normal = normalize(vec3(-dx, -dy, 1.0));
	    return normal * 0.5 + 0.5;
	}

	vec2 uv(Texture texture) {
		return vUv * texture.repeat - texture.offset;
	}

	vec3 hash3( vec2 p ){
    	vec3 q = vec3(dot(p,vec2(127.1,311.7)),
					  dot(p,vec2(269.5,183.3)),
					  dot(p,vec2(419.2,371.9)));
		return fract(sin(q)*43758.5453);
	}

	void main() {
		vec3 nPressure = computeNormalDeriv(pressure, vUv);
		nPressure.xy = nPressure.xy * 2. - 1.;
		vec3 texture = texture2D(textures[0].texture, uv(textures[0]) - nPressure.xy).rgb;
		vec3 color = mix(texture * vec3(vUv.y * 2.) - .02, vec3(1.), .2 * hash3(vUv));
		gl_FragColor = vec4(color, 1.);

	}
`;

type Uniforms = {
	textures: Texture[];
	pressure: WebGLTexture;
};

export interface Texture {
	texture: CreateTextureInfo;
	repeat: number[];
	offset: number[];
}

export class PaperKernel extends Kernel<Uniforms> {
	constructor(gl: WebGLRenderingContext) {
		super(gl, new Program(gl, vs, fs), new FTrangle(gl), null);
	}
}

export function getContainRepeat(iW: number, iH: number, tW: number, tH: number) {
	const iRatio = iW / iH;
	const tRatio = tW / tH;

	let x, y;

	if (iRatio > tRatio) {
		// image is wider → scale by height, crop sides
		x = tRatio / iRatio;
		y = 1;
	} else {
		// image is taller (or same ratio) → scale by width, crop top/bottom
		x = 1;
		y = iRatio / tRatio;
	}

	return [x, y];
}
