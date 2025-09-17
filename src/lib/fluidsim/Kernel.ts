import { bindFramebufferInfo } from "twgl.js";
import { FrameBuffer } from "./FBO";
import { Mesh } from "./Mesh";
import { Program } from "./Program";

export class Kernel<T extends {}> {
	gl: WebGLRenderingContext;
	program: Program<T>;
	output?: FrameBuffer | null;
	mesh: Mesh;

	shouldBind: boolean;
	shouldUnbind: boolean;

	constructor(
		gl: WebGLRenderingContext,
		program: Program<T>,
		mesh: Mesh,
		output?: FrameBuffer | null,
		shouldBind: boolean = true,
		shouldUnbind: boolean = true,
	) {
		this.gl = gl;
		this.program = program;
		this.mesh = mesh;
		this.output = output;
		this.shouldBind = shouldBind;
		this.shouldUnbind = shouldUnbind;
	}

	draw() {
		if (this.shouldBind) bindFramebufferInfo(this.gl, this.output?.object);

		this.program.updateUniforms();
		this.mesh.draw(this.program);

		if (this.shouldBind) bindFramebufferInfo(this.gl, null);
	}
}
