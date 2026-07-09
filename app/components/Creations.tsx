"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Creations.module.scss";

const galleryImages = [
    { src: "/images/creations/creatation_1.webp", alt: "Creation One"    },
    { src: "/images/creations/creatation_2.webp", alt: "Creation Two"    },
    { src: "/images/creations/creatation_3.webp", alt: "Creation Three"  },
    { src: "/images/creations/creatation_4.webp", alt: "Creation Four"   },
    { src: "/images/creations/creatation_5.webp", alt: "Creation Five"   },
    { src: "/images/creations/creatation_6.webp", alt: "Creation Six"    },
    { src: "/images/creations/creatation_7.webp", alt: "Creation Seven"  },
];

const reviews = [
    {
        name: "Ranjan Basnayake",
        rating: 5,
        date: "February 2026",
        text: "Britblooms is truly something special. From the moment we arrived, we were made to feel welcome and valued. It's clear that this is more than just a business — it's a passion project driven by love and care. The staff generously shared their knowledge and showed us several unique, artistic creations that were simply breathtaking.",
        initials: "RB",
    },
    {
        name: "Devini Seneviratne",
        rating: 5,
        date: "March 2026",
        text: "We bought a few fish and a few plants, and everything was healthy and beautiful. The shop has a lovely selection and a very calming atmosphere. The owner was very kind, helpful, and passionate. Highly recommend and will definitely visit again!",
        initials: "DS",
    },
    {
        name: "Sanjeewa Ekanayake",
        rating: 5,
        date: "May 2026",
        text: "I had the privilege of visiting BritBlooms by prior appointment, and it was genuinely a one-of-a-kind experience. Their philosophy of Nature, Design, and Harmony is not just a tagline — it is woven into every corner of their studio.",
        initials: "SE",
    },
    {
        name: "Tracy Glass",
        rating: 5,
        date: "March 2026",
        text: "A real unique and amazing experience — highly recommend for everyone to visit. Amazing atmosphere and very welcoming.",
        initials: "TG",
    },
    {
        name: "Racheli Hibben",
        rating: 5,
        date: "February 2026",
        text: "So in love with these beautiful creations ❤️ Very talented artist! And something for everyone. Will definitely be returning!",
        initials: "RH",
    },
];

const StarIcon = ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-label="Google" role="img">
        <path fill="#4285F4" d="M47.5 24.6c0-1.6-.1-3.1-.4-4.6H24v8.7h13.2C36.7 32 34.3 34.9 31 36.6v5h7.6C43.3 37 47.5 31.4 47.5 24.6z" />
        <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.7l-7.6-5c-2.2 1.5-5 2.3-8.4 2.3-6.4 0-11.8-4.3-13.8-10.1H2.4v5.2C6.4 42.8 14.6 48 24 48z" />
        <path fill="#FBBC05" d="M10.2 29.5C9.7 28 9.4 26.5 9.4 25s.3-3 .8-4.5v-5.2H2.4C.9 18.5 0 21.6 0 25s.9 6.5 2.4 9.7l7.8-5.2z" />
        <path fill="#EA4335" d="M24 10.4c3.6 0 6.8 1.2 9.3 3.7l7-7C36 2.6 30.5 0 24 0 14.6 0 6.4 5.2 2.4 12.8l7.8 5.2C12.2 14.7 17.6 10.4 24 10.4z" />
    </svg>
);

export default function Creations() {
    const [current, setCurrent] = useState(0);
    const [lightbox, setLightbox] = useState<number | null>(null);

    useEffect(() => {
        const id = setInterval(() => setCurrent(p => (p + 1) % reviews.length), 5000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (lightbox === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightbox(null);
            if (e.key === "ArrowRight") setLightbox(p => p === null ? null : (p + 1) % galleryImages.length);
            if (e.key === "ArrowLeft")  setLightbox(p => p === null ? null : (p - 1 + galleryImages.length) % galleryImages.length);
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [lightbox]);

    const review = reviews[current];

    return (
        <div className={styles.wrapper}>
            <section className={styles.section}>

                {/* Header */}
                <header className={styles.header}>
                    <span className={styles.eyebrow}>Our Creations</span>
                    <h2 className={styles.heading}>
                        Nature crafted<br />to inspire
                    </h2>
                </header>

                {/* Body: gallery left, reviews right */}
                <div className={styles.body}>

                    {/* Bento gallery */}
                    <div className={styles.gallery}>
                        {galleryImages.map((img, i) => (
                            <button
                                key={i}
                                className={`${styles.galleryItem} ${styles[`galleryItem--${i + 1}`]}`}
                                onClick={() => setLightbox(i)}
                                aria-label={`View ${img.alt} fullscreen`}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className={styles.galleryImg}
                                    sizes="(max-width: 1024px) 50vw, 28vw"
                                    priority={i === 0}
                                />
                                <div className={styles.galleryOverlay} />
                                <span className={styles.galleryZoom} aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                    </svg>
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Reviews panel */}
                    <div className={styles.reviewsCol}>

                        {/* Google badge */}
                        <div className={styles.googleBadge}>
                            <GoogleIcon />
                            <span className={styles.googleBadgeText}>Google Reviews</span>
                            <div className={styles.googleBadgeRight}>
                                <span className={styles.googleScore}>5.0</span>
                                <div className={styles.googleStars}>
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} className={styles.starGold} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Featured review — key triggers re-animation on change */}
                        <div key={current} className={styles.featuredReview}>
                            <div className={styles.quoteGlyph}>"</div>
                            <p className={styles.reviewText}>{review.text}</p>
                            <div className={styles.reviewerRow}>
                                <div className={styles.avatar}>{review.initials}</div>
                                <div className={styles.reviewerMeta}>
                                    <span className={styles.reviewerName}>{review.name}</span>
                                    <span className={styles.reviewDate}>{review.date}</span>
                                </div>
                                <div className={styles.reviewStars}>
                                    {[...Array(review.rating)].map((_, i) => (
                                        <StarIcon key={i} className={styles.starSmall} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Reviewer previews + dots */}
                        <div className={styles.reviewFooter}>
                            <div className={styles.avatarStrip}>
                                {reviews.map((r, i) => (
                                    <button
                                        key={i}
                                        className={`${styles.avatarBtn} ${i === current ? styles["avatarBtn--active"] : ""}`}
                                        onClick={() => setCurrent(i)}
                                        aria-label={`Review by ${r.name}`}
                                    >
                                        {r.initials}
                                    </button>
                                ))}
                            </div>
                            <div className={styles.dots}>
                                {reviews.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`${styles.dot} ${i === current ? styles["dot--active"] : ""}`}
                                        onClick={() => setCurrent(i)}
                                        aria-label={`Review ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </section>

            {/* Lightbox */}
            {lightbox !== null && (
                <div
                    className={styles.lightboxBackdrop}
                    onClick={() => setLightbox(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image viewer"
                >
                    <button
                        className={styles.lightboxClose}
                        onClick={() => setLightbox(null)}
                        aria-label="Close"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    <button
                        className={`${styles.lightboxNav} ${styles["lightboxNav--prev"]}`}
                        onClick={e => { e.stopPropagation(); setLightbox(p => p === null ? null : (p - 1 + galleryImages.length) % galleryImages.length); }}
                        aria-label="Previous image"
                    >
                        ←
                    </button>

                    <div
                        className={styles.lightboxImgWrap}
                        onClick={e => e.stopPropagation()}
                    >
                        <Image
                            key={lightbox}
                            src={galleryImages[lightbox].src}
                            alt={galleryImages[lightbox].alt}
                            fill
                            className={styles.lightboxImg}
                            sizes="95vw"
                            priority
                        />
                    </div>

                    <button
                        className={`${styles.lightboxNav} ${styles["lightboxNav--next"]}`}
                        onClick={e => { e.stopPropagation(); setLightbox(p => p === null ? null : (p + 1) % galleryImages.length); }}
                        aria-label="Next image"
                    >
                        →
                    </button>

                    <div className={styles.lightboxCounter}>
                        {lightbox + 1} / {galleryImages.length}
                    </div>
                </div>
            )}
        </div>
    );
}
