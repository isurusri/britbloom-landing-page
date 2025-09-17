import { FramebufferInfo, AttachmentOptions, createFramebufferInfo, resizeFramebufferInfo } from "twgl.js";

export class FrameBuffer {
	gl: WebGLRenderingContext;
	object: FramebufferInfo;
	private attachments: AttachmentOptions[];

	constructor(gl: WebGLRenderingContext, width: number, height: number, options: AttachmentOptions) {
		this.gl = gl;
		this.attachments = [options];
		this.object = createFramebufferInfo(gl, this.attachments, width, height);
	}

	setSize(width: number, height: number) {
		resizeFramebufferInfo(this.gl, this.object, this.attachments, width, height);
	}
}

export class DoubleFrameBuffer {
	gl: WebGLRenderingContext;
	private fbo1: FrameBuffer;
	private fbo2: FrameBuffer;

	constructor(gl: WebGLRenderingContext, width: number, height: number, options: AttachmentOptions) {
		this.gl = gl;
		this.fbo1 = new FrameBuffer(gl, width, height, options);
		this.fbo2 = new FrameBuffer(gl, width, height, options);
	}

	swap() {
		let temp = this.fbo1;
		this.fbo1 = this.fbo2;
		this.fbo2 = temp;
	}

	setSize(width: number, height: number) {
		this.fbo1.setSize(height, width);
	}

	get read() {
		return this.fbo1.object;
	}

	get write() {
		return this.fbo2.object;
	}
}
