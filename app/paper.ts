import {
	BufferInfo,
	ProgramInfo,
	FramebufferInfo,
	setUniforms,
	setBuffersAndAttributes,
	createBufferInfoFromArrays,
	createProgramInfo,
	drawBufferInfo,
	createBufferFromArray,
	CreateTextureInfo,
	createTextureAsync,
} from "twgl.js";

const vs = `
	attribute vec2 position;

	varying vec2 vUv;

	void main() {
		vUv = position * .5 + .5;
		vUv.y = 1. - vUv.y;
		gl_Position = vec4(position, 0.0, 1.0);
	}
`;

const fs = `
	precision mediump float;

	varying vec2 vUv;

	struct Texture {
		sampler2D texture;
		vec2 repeat;
		vec2 offset;
	};

	uniform Texture textures[1];

	vec2 uv(Texture texture) {
		return vUv * texture.repeat - texture.offset;
	}

	vec3 hash3( vec2 p ){
    	vec3 q = vec3( dot(p,vec2(127.1,311.7)),
					   dot(p,vec2(269.5,183.3)),
					   dot(p,vec2(419.2,371.9)));
		return fract(sin(q)*43758.5453);
	}

	void main() {
		vec3 texture = texture2D(textures[0].texture, uv(textures[0])).rgb;
		// vec3 color = mix(texture, vec3(0.0431, 0.2353, 0.2863), .25);
		vec3 color = mix(texture, vec3(1.), .2 * hash3(vUv));
		gl_FragColor = vec4(color, 1.);
	}
`;

type Uniforms = {
	textures: Texture[];
};

export class Paper {
	canvas: Canvas;
	shader: Shader<Uniforms>;
	quad: FQuad;

	constructor() {
		this.canvas = new Canvas();
		this.shader = new Shader(this.canvas.gl, vs, fs);
		this.quad = new FQuad(this.canvas.gl);
	}

	init() {
		this.shader.use();
		this.shader.updateUniforms();
		this.quad.draw(this.shader);
	}

	draw() {
		this.quad.draw(this.shader);
	}

	async setTexture(src: string, repeat: number[], offset: number[]) {
		const textureInfo = await createTextureAsync(this.canvas.gl, {
			src,
			min: this.canvas.gl.LINEAR,
			mag: this.canvas.gl.LINEAR,
		});

		this.shader.uniforms.textures = [
			{
				texture: textureInfo.texture,
				repeat,
				offset,
			},
		];

		this.shader.updateUniforms();
		this.quad.draw(this.shader);
	}

	dispose() {}

	get domElement() {
		return this.canvas.domElement;
	}
}

export interface Texture {
	texture: CreateTextureInfo;
	repeat: number[];
	offset: number[];
}

enum CanvasErrorCodes {
	WEBGL_NOT_SUPPROTED = 1,
}

export class Canvas {
	gl: WebGLRenderingContext;
	canvas: HTMLCanvasElement;

	constructor(options?: WebGLContextAttributes) {
		const canvas = document.createElement("canvas");

		const _gl = canvas.getContext("webgl", options);
		if (!_gl) throw new Error("WebGL not supported", { cause: CanvasErrorCodes.WEBGL_NOT_SUPPROTED });
		this.gl = _gl;

		this.canvas = canvas;
	}

	setSize(width: number, height: number) {
		this.canvas.width = width;
		this.canvas.height = height;
		this.gl.viewport(0, 0, width, height);
	}

	get domElement() {
		return this.canvas;
	}
}

export class Shader<T extends {}> {
	gl: WebGLRenderingContext;
	programInfo: ProgramInfo;
	uniforms: T;

	constructor(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string) {
		this.gl = gl;
		this.programInfo = createProgramInfo(this.gl, [vertexSource, fragmentSource]);
		this.uniforms = {} as T;
	}

	use() {
		this.gl.useProgram(this.programInfo.program);
	}

	updateUniforms() {
		setUniforms(this.programInfo, this.uniforms);
	}
}

export class FQuad {
	gl: WebGLRenderingContext;
	bufferInfo: BufferInfo;

	constructor(gl: WebGLRenderingContext) {
		this.gl = gl;
		this.bufferInfo = createBufferInfoFromArrays(gl, {
			position: {
				data: [-1, -1, 3, -1, -1, 3],
				numComponents: 2,
			},
		});
	}

	draw(shader: Shader<{}>) {
		setBuffersAndAttributes(this.gl, shader.programInfo, this.bufferInfo);
		drawBufferInfo(this.gl, this.bufferInfo);
	}
}

export function getContainRepeat(iW: number, iH: number, tW: number, tH: number) {
	const imgAspect = iW / iH;
	const targetAspect = tW / tH;

	let repeatX, repeatY;
	let offsetX = 0;
	let offsetY = 0;

	if (imgAspect > targetAspect) {
		// image is wider → scale by height, crop sides
		repeatX = targetAspect / imgAspect;
		repeatY = 1;
		offsetX = (1 - repeatX) / 2;
	} else {
		// image is taller (or same ratio) → scale by width, crop top/bottom
		repeatX = 1;
		repeatY = imgAspect / targetAspect;
		offsetY = (1 - repeatY) / 2;
	}

	return { repeatX, repeatY, offsetX, offsetY };
}
