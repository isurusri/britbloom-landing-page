//vert
import boundary from "./boundary.vert";
import cursor from "./cursor.vert";
import kernel from "./kernel.vert";

// frag
import addForce from "./addForce.frag";
import advect from "./advect.frag";
import divergence from "./divergence.frag";
import jacobi from "./jacobi.frag";
import subtractPressureGradient from "./subtractPressureGradient.frag";
import velocityBoundary from "./velocityBoundary.frag";
import visualize from "./visualize.frag";

export {
	boundary,
	cursor,
	kernel,
	addForce,
	advect,
	divergence,
	jacobi,
	subtractPressureGradient,
	velocityBoundary,
	visualize,
};
