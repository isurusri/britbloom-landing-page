"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Products.module.scss";

const products = [
    {
        id: 1,
        title: "Paludariums",
        image: "/images/products/paludarium01.webp",
        description: "We bring nature indoors with stunning paludarium plant designs. Blending lush greenery with flowing water, our creations capture the beauty of swamps, marshes, and rainforests — a living piece of nature to enjoy every day.",
        features: [
            "Recreates natural ecosystems like rainforests and wetlands",
            "Water, plants, and fauna create a calming atmosphere",
            "Live plants naturally purify indoor air",
            "Educational and inspiring for all ages",
            "A living art piece — not just a habitat",
        ],
    },
    {
        id: 2,
        title: "Aquascaped Tanks",
        image: "/images/products/aquascaped01.webp",
        description: "Living works of art that bring the beauty of underwater landscapes into your home. Carefully arranged aquatic plants, rocks, and driftwood recreate the harmony of rivers, lakes, and aquatic gardens.",
        features: [
            "Every glance feels like a serene riverbed",
            "Flowing water and vibrant greenery ease stress",
            "Live aquatic plants contribute to healthier air",
            "A living, breathing piece of nature",
        ],
    },
    {
        id: 3,
        title: "Terrariums",
        image: "/images/products/terrariums01.webp",
        description: "Miniature gardens enclosed in glass, designed to replicate natural ecosystems. Soil, moss, plants, and decorative elements create a small, self-sustaining world of greenery that thrives indoors.",
        features: [
            "Calming plant presence without needing a garden",
            "Adds elegance and a modern natural touch to any room",
            "Many terrarium plants require minimal care",
            "Plants improve air quality and soothe the environment",
            "Each terrarium customised with unique plants",
        ],
    },
    {
        id: 4,
        title: "Luxury Vertical Gardens",
        image: "/images/products/verticalgarden01.webp",
        description: "We transform walls into living works of art with bespoke vertical gardens. Designed to bring a refined sense of nature into your interiors, our creations combine elegance, tranquility, and timeless style.",
        features: [
            "Bespoke designs tailored to your space",
            "Premium plants and exclusive products",
            "Contemporary to sophisticated displays",
            "Elevates environments into sanctuaries of beauty",
            "Nature as a statement of luxury",
        ],
    },
    {
        id: 5,
        title: "Premium Plant Designs & Moss Art",
        image: "/images/products/mossart01.webp",
        description: "Premium plant designs and bespoke moss art that bring the calming essence of nature into your space. Each design is tailored to your style, transforming ordinary spaces into refreshing green sanctuaries.",
        features: [
            "Carefully selected greenery with aesthetic arrangements",
            "Living or preserved botanical artworks from natural moss",
            "Unique, sustainable, and low-maintenance",
            "Perfect for home, office, or commercial spaces",
            "Reduces stress and improves air quality",
        ],
    },
    {
        id: 6,
        title: "Designer Water Features",
        image: "/images/products/fountain01.webp",
        description: "Bespoke water installations that transform homes, gardens, offices, and public spaces. Designed to enhance visual appeal and create ambiance — going beyond simply providing flowing water.",
        features: [
            "Fountains in modern, classical, or abstract styles",
            "Ponds and water gardens bringing natural serenity",
            "Water walls with elegant vertical surfaces",
            "Sculptural features with bespoke artwork",
            "Custom-tailored designs with lighting and textures",
        ],
    },
];

export default function Products() {
    const [current, setCurrent] = useState(0);
    const [fading, setFading] = useState(false);

    const go = (index: number) => {
        if (fading || index === current) return;
        setFading(true);
        setTimeout(() => {
            setCurrent(index);
            setFading(false);
        }, 280);
    };

    const prev = () => go((current - 1 + products.length) % products.length);
    const next = () => go((current + 1) % products.length);
    const product = products[current];

    return (
      <div className={styles.wrapper}>
        <section className={styles.section}>
          {/* Section header */}
          <header className={styles.header}>
            <span className={styles.eyebrow}>Our Collection</span>
            <h2 className={styles.heading}>
              Living nature,
              <br />
              crafted for you
            </h2>
          </header>

          {/* Product layout */}
          <div className={styles.layout}>
            {/* Left — image panel */}
            <div className={styles.imagePanel}>
              <div
                className={`${styles.imageWrap} ${fading ? styles["imageWrap--fading"] : ""}`}
              >
                {products.map((p, i) => (
                  <div
                    key={p.id}
                    className={`${styles.slide} ${i === current ? styles["slide--active"] : ""}`}
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className={styles.slideImg}
                      sizes="(max-width: 768px) 100vw, 55vw"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>

              {/* Thumbnail strip */}
              <div className={styles.thumbs}>
                {products.map((p, i) => (
                  <button
                    key={p.id}
                    className={`${styles.thumb} ${i === current ? styles["thumb--active"] : ""}`}
                    onClick={() => go(i)}
                    aria-label={p.title}
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="80px"
                      className={styles.thumbImg}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right — content panel */}
            <div
              className={`${styles.content} ${fading ? styles["content--fading"] : ""}`}
            >
              <div className={styles.counter}>
                <span className={styles.counterCurrent}>
                  {String(current + 1).padStart(2, "0")}
                </span>
                <span className={styles.counterBar} />
                <span className={styles.counterTotal}>
                  {String(products.length).padStart(2, "0")}
                </span>
              </div>

              <h3 className={styles.productName}>{product.title}</h3>
              <p className={styles.description}>{product.description}</p>

              <ul className={styles.features}>
                {product.features.map((f, i) => (
                  <li key={i} className={styles.feature}>
                    <span className={styles.featureDash} aria-hidden="true">
                      —
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.controls}>
                <button
                  className={styles.arrow}
                  onClick={prev}
                  aria-label="Previous product"
                >
                  ←
                </button>
                <div className={styles.dots}>
                  {products.map((_, i) => (
                    <button
                      key={i}
                      className={`${styles.dot} ${i === current ? styles["dot--active"] : ""}`}
                      onClick={() => go(i)}
                      aria-label={`Product ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  className={styles.arrow}
                  onClick={next}
                  aria-label="Next product"
                >
                  →
                </button>
              </div>

              <a
                href="https://shop.britblooms.com/collections"
                className={styles.shopLink}
              >
                Browse Collection →
              </a>
            </div>
          </div>
        </section>
      </div>
    );
}
