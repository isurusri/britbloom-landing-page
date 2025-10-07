"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

const Shop = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const shopImages = [
        "/images/shop/shopbg1.jpg",
        "/images/shop/shopbg2.jpg",
        "/images/shop/shopbg3.jpg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % shopImages.length
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [shopImages.length]);

    return (
        <div className={`${styles["shop-page"]} bg-white`}>
            <div className={styles["background-slideshow"]}>
                {shopImages.map((image, index) => (
                    <div
                        key={index}
                        className={`${styles["background-image"]} ${index === currentImageIndex ? styles["active"] : ""
                            }`}
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ))}
            </div>
            <main className={styles["shop-content"]}>
                <div className={styles["shop-container"]}>
                    <div className={styles["coming-soon"]}>
                        <h1 className={styles["title"]}>Our Online Shop</h1>
                        <h2 className={styles["subtitle"]}>Coming Soon</h2>
                        <p className={styles["description"]}>
                            We're working hard to bring you an amazing shopping experience.
                            Our online store will be launching soon with our beautiful collection
                            of nature inspired products.
                        </p>
                    </div>

                    <div className={styles["contact-section"]}>
                        <h3 className={styles["contact-title"]}>Need to Place an Order?</h3>
                        <p className={styles["contact-description"]}>
                            While we prepare our online store, you can still place orders through our contact options:
                        </p>

                        <div className={styles["contact-options"]}>
                            <div className={styles["contact-option"]}>
                                <h4>Email Us</h4>
                                <p>Send us your requirements and we'll get back to you within 24 hours</p>
                                <a href="mailto:info@britblooms.com" className={styles["contact-link"]}>
                                    info@britblooms.com
                                </a>
                            </div>

                            <div className={styles["contact-option"]}>
                                <h4>Call Us</h4>
                                <p>Speak directly with our team for personalized service</p>
                                <a href="tel:+441165095161" className={styles["contact-link"]}>
                                    +44 11 6509 5161
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={styles["cta-section"]}>
                        <Link href="/#contact" className={styles["cta-button"]}>
                            Get in Touch
                        </Link>
                        <Link href="/#hero" className={styles["back-button"]}>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Shop;
