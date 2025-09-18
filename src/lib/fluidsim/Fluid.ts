import { vec2 } from "gl-matrix";
import { AttachmentOptions } from "twgl.js";
import { FrameBuffer, Mesh, FQuad, Boundary, Kernel, Program } from "./";
import { kernel, advect, boundary, cursor, addForce, divergence, jacobi, subtractPressureGradient } from "./shaders";
import {
	AddForceUniforms,
	AdvectionUniforms,
	DivergenceUniforms,
	JacobiUniforms,
	PressureBoundaryUniforms,
	SubtractPressureGradientBoundaryUniforms,
	SubtractPressureGradientUniforms,
	VelocityBoundaryUniforms,
} from "./@types/uniforms";

type FluidOptions = {
	iterations: number;
	mouseForce: number;
	cursorSize: number;
	step: number;
};

export class Fluid {
	gl: WebGLRenderingContext;

	width: number;
	height: number;

	texel: vec2;
	px1: vec2;

	fboAttachmentOtions: AttachmentOptions;

	velocityFBO1: FrameBuffer;
	velocityFBO2: FrameBuffer;
	pressureFBO1: FrameBuffer;
	pressureFBO2: FrameBuffer;
	divergenceFBO: FrameBuffer;

	pointer: vec2 = [0, 0];
	pointer0: vec2 = [0, 0];

	advectionKernel: Kernel<AdvectionUniforms>;
	velocityBKernel: Kernel<VelocityBoundaryUniforms>;
	addForceKernel: Kernel<AddForceUniforms>;
	divergenceKernel: Kernel<DivergenceUniforms>;
	jacobiKernel: Kernel<JacobiUniforms>;
	pressureBKernel: Kernel<PressureBoundaryUniforms>;
	subtractPressureGradientKernel: Kernel<SubtractPressureGradientUniforms>;
	subtractPressureGradientBKernel: Kernel<SubtractPressureGradientBoundaryUniforms>;

	meshAll: Mesh;
	meshInside: Mesh;
	meshBoundary: Mesh;
	meshCursor: Mesh;

	options: FluidOptions;

	constructor(gl: WebGLRenderingContext, width: number, height: number) {
		gl.enable(gl.CULL_FACE);
		gl.lineWidth(1.0);

		this.gl = gl;

		this.width = width;
		this.height = height;

		this.texel = [1 / width, 1 / height];
		this.px1 = [1, width / height];

		// default options
		this.options = {
			iterations: 32,
			mouseForce: 1,
			cursorSize: 38,
			step: 1 / 60,
		};

		// FBOs
		const halfFloat = gl.getExtension("OES_texture_half_float");
		if (!halfFloat) throw new Error("OES_texture_half_float not supported");
		gl.getExtension("OES_texture_half_float_linear");

		this.fboAttachmentOtions = {
			format: gl.RGBA,
			type: halfFloat.HALF_FLOAT_OES,
			min: gl.LINEAR,
			mag: gl.LINEAR,
		};
		this.velocityFBO1 = new FrameBuffer(gl, width, height, this.fboAttachmentOtions);
		this.velocityFBO2 = new FrameBuffer(gl, width, height, this.fboAttachmentOtions);
		this.divergenceFBO = new FrameBuffer(gl, width, height, this.fboAttachmentOtions);
		this.pressureFBO1 = new FrameBuffer(gl, width, height, this.fboAttachmentOtions);
		this.pressureFBO2 = new FrameBuffer(gl, width, height, this.fboAttachmentOtions);

		// Mehes
		this.meshAll = new FQuad(gl);
		this.meshInside = new FQuad(gl, 1.0 - this.texel[0] * 2.0, 1.0 - this.texel[1] * 2.0);
		this.meshBoundary = new Boundary(gl, this.texel[0], this.texel[1]);
		this.meshCursor = new FQuad(
			gl,
			this.texel[0] * this.options.cursorSize * 2,
			this.texel[1] * this.options.cursorSize * 2,
		);

		// Kernels
		this.advectionKernel = new Kernel(gl, new Program(gl, kernel, advect), this.meshInside, this.velocityFBO2);
		this.velocityBKernel = new Kernel(gl, new Program(gl, boundary, advect), this.meshBoundary, this.velocityFBO2);
		this.addForceKernel = new Kernel(gl, new Program(gl, cursor, addForce), this.meshCursor, this.velocityFBO2);
		this.divergenceKernel = new Kernel(gl, new Program(gl, kernel, divergence), this.meshAll, this.divergenceFBO);
		this.jacobiKernel = new Kernel(gl, new Program(gl, kernel, jacobi), this.meshAll, this.pressureFBO2);
		this.jacobiKernel.shouldUnbind = false;

		this.pressureBKernel = new Kernel(gl, new Program(gl, boundary, jacobi), this.meshBoundary, this.pressureFBO2);
		this.pressureBKernel.shouldBind = false;
		this.pressureBKernel.shouldUnbind = false;

		this.subtractPressureGradientKernel = new Kernel(
			gl,
			new Program(gl, kernel, subtractPressureGradient),
			this.meshAll,
			this.velocityFBO1,
		);
		this.subtractPressureGradientBKernel = new Kernel(
			gl,
			new Program(gl, boundary, subtractPressureGradient),
			this.meshBoundary,
			this.velocityFBO1,
		);

		this.pointer0 = this.pointer;
	}

	setSize(width: number, height: number) {
		this.width = width;
		this.height = height;

		this.texel = [1 / width, 1 / height];
		this.px1 = [1, width / height];

		this.velocityFBO1.setSize(width, height);
		this.velocityFBO2.setSize(width, height);
		this.pressureFBO1.setSize(width, height);
		this.pressureFBO2.setSize(width, height);
		this.divergenceFBO.setSize(width, height);
	}

	setPointer(value: vec2) {
		this.pointer = value;
	}

	initUniforms() {
		this.advectionKernel.program.uniforms = {
			px: this.texel,
			px1: this.px1,
			velocity: this.velocityFBO1.object.attachments[0],
			source: this.velocityFBO1.object.attachments[0],
			dt: this.options.step * 0.1,
			scale: 1,
		};

		this.velocityBKernel.program.uniforms = {
			px: this.texel,
			velocity: this.velocityFBO1.object.attachments[0],
			source: this.velocityFBO1.object.attachments[0],
			dt: this.options.step,
			scale: 1,
		};

		this.addForceKernel.program.uniforms = {
			px: this.texel,
			force: vec2.fromValues(0.5, 0.3),
			center: vec2.fromValues(0.5, 0.5),
			scale: vec2.fromValues(this.options.cursorSize * this.texel[0], this.options.cursorSize * this.texel[1]),
		};

		this.divergenceKernel.program.uniforms = {
			px: this.texel,
			velocity: this.velocityFBO2.object.attachments[0],
		};

		this.jacobiKernel.program.uniforms = {
			px: this.texel,
			alpha: -1.0,
			beta: 0.25,
			pressure: this.pressureFBO1.object.attachments[0],
			divergence: this.divergenceFBO.object.attachments[0],
		};

		this.pressureBKernel.program.uniforms = {
			px: this.texel,
			alpha: -1.0,
			beta: 0.25,
			pressure: this.pressureFBO1.object.attachments[0],
			divergence: this.divergenceFBO.object.attachments[0],
		};

		this.subtractPressureGradientKernel.program.uniforms = {
			px: this.texel,
			pressure: this.pressureFBO1.object.attachments[0],
			velocity: this.velocityFBO2.object.attachments[0],
			scale: 1.0,
		};

		this.subtractPressureGradientBKernel.program.uniforms = {
			px: this.texel,
			pressure: this.pressureFBO1.object.attachments[0],
			velocity: this.velocityFBO2.object.attachments[0],
			scale: -1.0,
		};
	}

	step() {
		this.advectionKernel.program.use();
		this.advectionKernel.program.uniforms.dt = this.options.step * 1.0;
		this.advectionKernel.draw();

		let x1 = this.pointer[0],
			y1 = this.pointer[1],
			xd = x1 - this.pointer0[0],
			yd = y1 - this.pointer0[1];
		this.pointer0[0] = x1;
		this.pointer0[1] = y1;
		if (this.pointer0[0] === 0 && this.pointer0[1] === 0) xd = yd = 0;

		this.addForceKernel.program.use();
		vec2.set(
			this.addForceKernel.program.uniforms.force,
			xd * this.texel[0] * this.options.cursorSize * this.options.mouseForce,
			-yd * this.texel[1] * this.options.cursorSize * this.options.mouseForce,
		);
		vec2.set(
			this.addForceKernel.program.uniforms.center,
			this.pointer0[0] * this.texel[0] * 2 - 1.0,
			(this.pointer0[1] * this.texel[1] * 2 - 1.0) * -1,
		);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
		this.gl.enable(this.gl.BLEND);
		this.addForceKernel.draw();
		this.gl.disable(this.gl.BLEND);

		// this.velocityBoundaryKernel.program.use();
		// this.velocityBoundaryKernel.program.uniforms.velocity = this.velocityFBO1.object.attachments[0];
		// this.velocityBoundaryKernel.program.uniforms.source = this.velocityFBO1.object.attachments[0];
		// this.velocityBoundaryKernel.draw();

		this.divergenceKernel.program.use();
		this.divergenceKernel.program.uniforms.velocity = this.velocityFBO2.object.attachments[0];
		this.divergenceKernel.draw();

		var p0 = this.pressureFBO1,
			p1 = this.pressureFBO2,
			p_ = p0;
		for (var i = 0; i < this.options.iterations; i++) {
			this.jacobiKernel.program.use();
			this.jacobiKernel.program.uniforms.pressure = p0.object.attachments[0];
			this.jacobiKernel.output = p1;
			this.jacobiKernel.draw();

			// this.pressureBoundaryKernel.program.use();
			// this.pressureBoundaryKernel.program.uniforms.pressure = p0.object.attachments[0];
			// this.pressureBoundaryKernel.output = p1;
			// this.pressureBoundaryKernel.draw();

			p_ = p0;
			p0 = p1;
			p1 = p_;
		}

		this.subtractPressureGradientKernel.program.use();
		this.subtractPressureGradientKernel.program.uniforms.pressure = this.pressureFBO1.object.attachments[0];
		this.subtractPressureGradientKernel.program.uniforms.velocity = this.velocityFBO2.object.attachments[0];
		this.subtractPressureGradientKernel.draw();

		// this.subtractPressureGradientBoundaryKernel.program.use();
		// this.subtractPressureGradientBoundaryKernel.program.uniforms.pressure = this.pressureFBO1.object.attachments[0];
		// this.subtractPressureGradientBoundaryKernel.program.uniforms.velocity = this.velocityFBO2.object.attachments[0];
		// this.subtractPressureGradientBoundaryKernel.draw();
	}
}
