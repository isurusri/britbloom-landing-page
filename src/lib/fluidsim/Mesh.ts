import { BufferInfo, createBufferInfoFromArrays, drawBufferInfo, setBuffersAndAttributes } from "twgl.js";
import { Program } from "./Program";

export class Mesh {
	gl: WebGLRenderingContext;
	bufferInfo: BufferInfo;

	constructor(gl: WebGLRenderingContext, bufferInfo: BufferInfo) {
		this.gl = gl;
		this.bufferInfo = bufferInfo;
	}

	draw(program: Program<{}>) {
		setBuffersAndAttributes(this.gl, program.programInfo, this.bufferInfo);
		drawBufferInfo(this.gl, this.bufferInfo, this.gl.TRIANGLES);
	}
}

export class FTrangle extends Mesh {
	constructor(gl: WebGLRenderingContext) {
		super(
			gl,
			createBufferInfoFromArrays(gl, {
				position: {
					data: new Float32Array([-1, -1, 3, -1, -1, 3]),
					numComponents: 2,
				},
			}),
		);
	}
}

export class FQuad extends Mesh {
	constructor(gl: WebGLRenderingContext, xScale: number = 1.0, yScale: number = 1.0) {
		super(
			gl,
			createBufferInfoFromArrays(gl, {
				position: {
					data: new Float32Array([
						-xScale,
						yScale,
						0,
						-xScale,
						-yScale,
						0,
						xScale,
						-yScale,
						0,

						-xScale,
						yScale,
						0,
						xScale,
						-yScale,
						0,
						xScale,
						yScale,
						0,
					]),
				},
			}),
		);
	}
}

export class Boundary extends Mesh {
	constructor(gl: WebGLRenderingContext, px: number = 1.0, py: number = 1.0) {
		super(
			gl,
			createBufferInfoFromArrays(gl, {
				position: {
					data: new Float32Array([
						// bottom
						-1 + px * 0.0,
						-1 + py * 0.0,
						1 - px * 0.0,
						-1 + py * 0.0,

						// top
						-1 + px * 0.0,
						1 - py * 0.0,
						1 - px * 0.0,
						1 - py * 0.0,

						// left
						-1 + px * 0.0,
						-1 + py * 0.0,
						-1 + px * 0.0,
						1 - py * 0.0,

						// right
						1 - px * 0.0,
						-1 + py * 0.0,
						1 - px * 0.0,
						1 - py * 0.0,
					]),
					numComponents: 2,
				},
				offset: {
					data: new Float32Array([
						// bottom
						-px * 0.0,
						py * 2.0,
						-px * 0.0,
						py * 2.0,

						// top
						-px * 0.0,
						-py * 2.0,
						-px * 0.0,
						-py * 2.0,

						// left
						px * 2.0,
						-py * 0.0,
						px * 2.0,
						-py * 0.0,

						// right
						-px * 2.0,
						-py * 0.0,
						-px * 2.0,
						-py * 0.0,
					]),
					numComponents: 2,
				},
			}),
		);
	}

	draw(program: Program<{}>): void {
		setBuffersAndAttributes(this.gl, program.programInfo, this.bufferInfo);
		drawBufferInfo(this.gl, this.bufferInfo, this.gl.LINES);
	}
}
