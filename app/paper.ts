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

	void main() {
		gl_FragColor = vec4(vec3(1.), 1.);
	}
`;

type Uniforms = {};

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

	dispose() {}

	get domElement() {
		return this.canvas.domElement;
	}
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
