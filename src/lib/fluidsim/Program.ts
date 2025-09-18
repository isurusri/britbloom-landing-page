import { ProgramInfo, setUniforms, createProgramInfo } from "twgl.js";

export class Program<T extends {}> {
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
