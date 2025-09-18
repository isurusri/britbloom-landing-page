enum CanvasErrorCodes {
	WEBGL_NOT_SUPPROTED = 1,
}

export class Canvas {
	gl: WebGLRenderingContext;
	canvas: HTMLCanvasElement;

	constructor(options?: WebGLContextAttributes) {
		const canvas = document.createElement("canvas", {});

		const _gl = canvas.getContext("webgl", options);
		if (!_gl) throw new Error("WebGL not supported", { cause: CanvasErrorCodes.WEBGL_NOT_SUPPROTED });
		this.gl = _gl;

		this.gl.getExtension("OES_standard_derivatives");
		this.gl.getExtension("OES_texture_half_float_linear");
		this.gl.getExtension("OES_texture_half_float");

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
