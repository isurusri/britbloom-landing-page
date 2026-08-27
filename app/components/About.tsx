"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./About.module.scss";

const aboutImages = [
    { id: 1, src: "/images/about/paludarium.webp",     alt: "Paludarium Design",  title: "Paludarium Creations" },
    { id: 2, src: "/images/about/aquascaped.webp",     alt: "Aquascaped Tank",    title: "Aquascaped Tanks"     },
    { id: 3, src: "/images/about/terrariums.webp",     alt: "Terrarium Design",   title: "Terrarium Gardens"    },
    { id: 4, src: "/images/about/verticalgarden.webp", alt: "Vertical Garden",    title: "Vertical Gardens"     },
    { id: 5, src: "/images/about/mossart .webp",       alt: "Moss Art",           title: "Moss Art Designs"     },
    { id: 6, src: "/images/about/ponds.webp",          alt: "Water Features",     title: "Water Features"       },
];

const pillars = [
    { label: "Expertise",      body: "Nature, design, and harmony are at the heart of every creation we make." },
    { label: "Quality",        body: "Attention to detail and refinement define each living piece we craft."    },
    { label: "Sustainability", body: "Eco-friendly materials and practices woven into every project."           },
];

export default function About() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setCurrent((p) => (p + 1) % aboutImages.length), 5000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className={styles.wrapper}>
            <section className={styles.section}>

                {/* Left — narrative text */}
                <div className={styles.textCol}>
                    <span className={styles.eyebrow}>About BritBlooms</span>
                    <h2 className={styles.heading}>
                        Rooted in nature,<br />designed for life
                    </h2>

                    <p className={styles.lead}>
                        At BritBlooms, our passion is rooted in Nature, Design, and Harmony.
                        We embrace the art of living nature — bringing you closer to the beauty
                        of the natural world, whether indoors or out.
                    </p>

                    <p className={styles.body}>
                        Our creations include paludariums, aquascaped tanks, terrariums, vertical
                        gardens, premium plant designs, and moss art — each thoughtfully crafted
                        to bring the essence of nature into your home, office, or workplace.
                    </p>

                    <p className={styles.body}>
                        As hobbyists and nature lovers, we take pride in sharing the artistry of
                        living nature. The little things matter — attention to detail, refinement,
                        and quality are at the heart of everything we do.
                    </p>

                    {/* Three pillars */}
                    <div className={styles.pillars}>
                        {pillars.map((p, i) => (
                            <div key={i} className={styles.pillar}>
                                <span className={styles.pillarLabel}>{p.label}</span>
                                <p className={styles.pillarBody}>{p.body}</p>
                            </div>
                        ))}
                    </div>

                    {/* Mission quote */}
                    <blockquote className={styles.mission}>
                        "To deliver only the best — helping you experience the harmony
                        and inspiration that nature brings into everyday life."
                    </blockquote>
                </div>

                {/* Right — auto-rotating image */}
                <div className={styles.imageCol}>
                    <div className={styles.imageWrap}>
                        {aboutImages.map((img, i) => (
                            <div
                                key={img.id}
                                className={`${styles.slide} ${i === current ? styles["slide--active"] : ""}`}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className={styles.slideImg}
                                    sizes="(max-width: 1024px) 100vw, 45vw"
                                    priority={i === 0}
                                />
                            </div>
                        ))}

                        <div className={styles.imageOverlay} aria-hidden="true" />

                        <div className={styles.imageCaption}>
                            <span className={styles.captionTitle}>{aboutImages[current].title}</span>
                            <div className={styles.captionDots}>
                                {aboutImages.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`${styles.dot} ${i === current ? styles["dot--active"] : ""}`}
                                        onClick={() => setCurrent(i)}
                                        aria-label={`Image ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}
