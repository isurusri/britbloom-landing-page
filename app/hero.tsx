"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Fluid, Canvas, Program, FQuad } from "../src/lib/fluidsim";

import styles from "./hero.module.scss";
import { getContainRepeat, PaperKernel } from "./paper";
import { createTextureAsync } from "twgl.js";

export default function Hero() {
	const el = useRef < HTMLDivElement > (null);
	const canvas = useRef < Canvas > (null);
	const paper = useRef < PaperKernel > (null);
	const fluid = useRef < Fluid > (null);
	const [isInitialized, setIsInitialized] = useState(false);

	// Handle component mounting and reinitialization
	useEffect(() => {
		setIsInitialized(true);
		return () => {
			setIsInitialized(false);
		};
	}, []);

	useEffect(() => {
		if (!isInitialized) return;

		// Clean up any existing canvas
		if (canvas.current && el.current) {
			try {
				el.current.removeChild(canvas.current.domElement);
			} catch (e) {
				// Canvas might not be attached, ignore error
			}
		}

		if (!el.current) return;

		// Create new canvas
		canvas.current = new Canvas({ antialias: false });
		const { clientWidth, clientHeight } = el.current;
		canvas.current.setSize(clientWidth, clientHeight);
		el.current.appendChild(canvas.current.domElement);

		const gl = canvas.current.gl;
		paper.current = new PaperKernel(gl);

		fluid.current = new Fluid(gl, clientWidth * 0.25, clientHeight * 0.25);
		fluid.current.initUniforms();

		let fId: number;
		function animate(time: number) {
			if (!fluid.current || !paper.current) return;

			fluid.current.step();

			paper.current.program.use();
			paper.current.program.uniforms.pressure = fluid.current.pressureFBO2.object.attachments[0];
			paper.current.draw();

			fId = requestAnimationFrame(animate);
		}
		fId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(fId);
			if (canvas.current && el.current) {
				try {
					el.current.removeChild(canvas.current.domElement);
				} catch (e) {
					// Canvas might not be attached, ignore error
				}
			}
		};
	}, [isInitialized]);

	useEffect(() => {
		async function loadTexture() {
			if (!canvas.current) return;

			const textureInfo = await createTextureAsync(canvas.current.gl, {
				src: "/images/bg4i.webp",
				min: canvas.current.gl.LINEAR,
				mag: canvas.current.gl.LINEAR,
				flipY: canvas.current.gl.UNPACK_FLIP_Y_WEBGL,
			});

			const { width, height } = canvas.current.domElement;
			const repeat = getContainRepeat(1919, 1371, width, height);

			if (paper.current) {
				paper.current.program.use();
				paper.current.program.uniforms.textures = [
					{
						texture: textureInfo.texture,
						offset: [0, 0],
						repeat,
					},
				];
				paper.current.draw();
			}
		}

		loadTexture();
	}, [isInitialized]);

	useEffect(() => {
		function handleWindowResize() {
			if (!el.current) return;

			const { clientWidth, clientHeight } = el.current;
			canvas.current?.setSize(clientWidth, clientHeight);
			fluid.current?.setSize(clientWidth * 0.25, clientHeight * 0.25);
			fluid.current?.initUniforms();

			const repeat = getContainRepeat(1919, 1371, clientWidth, clientHeight);
			if (paper.current) paper.current.program.uniforms.textures[0].repeat = repeat;
		}

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, [isInitialized]);

	useEffect(() => {
		function handlePointerMove({ clientX, clientY }: { clientX: number; clientY: number }) {
			fluid.current?.setPointer([clientX * 0.25, clientY * 0.25]);
		}

		el.current?.addEventListener("pointermove", handlePointerMove);

		return () => {
			el.current?.removeEventListener("pointermove", handlePointerMove);
		};
	}, [isInitialized]);

	return (
		<div className={styles["wrapper"]}>

			{/* ── Editorial left accent line ── */}
			<div className={styles["left-accent"]} aria-hidden="true" />

			{/* ── 3-row content grid ── */}
			<div className={styles["content"]}>

				{/* ROW 2 — Main tagline stage */}
				<div className={styles["stage"]}>
					<div className={styles["stage-inner"]}>

						{/* Brand wordmark above tagline */}
						<div className={styles["eyebrow"]}>
							<div className={styles["eyebrow-icon"]}>
								<Image
									src="/images/britblooms.svg"
									alt=""
									width={18}
									height={18}
								/>
							</div>
							<span className={styles["eyebrow-name"]}>BRITBLOOMS</span>
						</div>

						{/* Primary heading — line 2 offset + sand colour */}
						<h1 className={styles["tagline"]}>
							<span className={styles["line1"]}>The art of</span>
							<span className={styles["line2"]}>living nature</span>
						</h1>

					</div>
				</div>

				{/* ROW 3 — Bottom bar: subtitle / divider / CTAs */}
				<div className={styles["bottom-bar"]}>

					<p className={styles["subtitle"]}>
						We blend the beauty of the natural world seamlessly
						into your indoor and outdoor spaces.
					</p>

					<div className={styles["bar-divider"]} aria-hidden="true" />

					<div className={styles["cta-group"]}>
						<a
							href="https://shop.britblooms.com"
							className={styles["cta-primary"]}
						>
							Shop Now →
						</a>
						<a
							href="#products"
							className={styles["cta-secondary"]}
						>
							Explore
						</a>
					</div>

				</div>

			</div>

			{/* ── Right-side vertical scroll indicator ── */}
			<div className={styles["scroll-indicator"]} aria-hidden="true">
				<span className={styles["scroll-text"]}>Scroll</span>
				<div className={styles["scroll-line-wrap"]}>
					<div className={styles["scroll-line"]} />
				</div>
			</div>

			{/* ── WebGL canvas (background) ── */}
			<div ref={el} className={styles["canvas"]} />

		</div>
	);
}
