import { vec2 } from "gl-matrix";

export type AdvectionUniforms = {
	px: vec2;
	px1: vec2;
	scale: number;
	velocity: WebGLTexture;
	source: WebGLTexture;
	dt: number;
};

export type VelocityBoundaryUniforms = {
	px: vec2;
	scale: number;
	velocity: WebGLTexture;
	source: WebGLTexture;
	dt: number;
};

export type AddForceUniforms = {
	px: vec2;
	force: vec2;
	center: vec2;
	scale: vec2;
};

export type DivergenceUniforms = {
	px: vec2;
	velocity: WebGLTexture;
};

export type JacobiUniforms = {
	px: vec2;
	pressure: WebGLTexture;
	divergence: WebGLTexture;
	alpha: number;
	beta: number;
};

export type PressureBoundaryUniforms = {
	px: vec2;
	pressure: WebGLTexture;
	divergence: WebGLTexture;
	alpha: number;
	beta: number;
};

export type SubtractPressureGradientUniforms = {
	px: vec2;
	scale: number;
	pressure: WebGLTexture;
	velocity: WebGLTexture;
};

export type SubtractPressureGradientBoundaryUniforms = {
	px: vec2;
	scale: number;
	pressure: WebGLTexture;
	velocity: WebGLTexture;
};
