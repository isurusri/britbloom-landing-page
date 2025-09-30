import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	reactStrictMode: true,
	images: {
		unoptimized: true, // Disable image optimization for static export
	},
	turbopack: {
		rules: {
			"**/*.{glsl,vert,frag}": {
				loaders: ["raw-loader"], // read file contents as a string
				as: "*.js", // expose it as a JS module
			},
		},
	},
};

export default nextConfig;
