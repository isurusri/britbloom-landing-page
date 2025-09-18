"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className={`${styles["navbar"]} flex items-center p-2 text-white relative`}>
                {/* Left side - Desktop Navigation Links (hidden on mobile and tablet) */}
                <div className={`${styles["navbar__links"]} hidden lg:flex gap-8 flex-1`}>
                    <a href="#products" className={`${styles["navbar__link"]} hover:text-primary transition-colors`}>PRODUCTS</a>
                    <a href="#about" className={`${styles["navbar__link"]} hover:text-primary transition-colors`}>ABOUT</a>
                    <a href="#contact" className={`${styles["navbar__link"]} hover:text-primary transition-colors`}>CONTACT</a>
                </div>

                {/* Center - Logo - Always visible */}
                <div className={`${styles["navbar__logo-container"]} absolute left-1/2 transform -translate-x-1/2`}>
                    <a href="#hero" className={styles["navbar__logo"]}>
                        <Image
                            alt="BritBlooms Logo"
                            src="/images/britblooms.svg"
                            width={60}
                            height={60}
                            className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20"
                        />
                    </a>
                </div>

                {/* Right side - Shop Now (desktop) and Mobile Menu Button */}
                <div className="flex items-center gap-4 ml-auto">
                    {/* Shop Now Button - Hidden on mobile and tablet */}
                    <button className={`${styles["shop-now"]} hidden lg:block`}>
                        SHOP NOW
                    </button>

                    {/* Mobile Menu Button - Right side */}
                    <button
                        className={`${styles["navbar__menu-button"]} lg:hidden`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span className={`${styles["hamburger"]} ${isMenuOpen ? styles["hamburger--active"] : ""}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay - Outside header */}
            <div className={`${styles["navbar__mobile-menu"]} ${isMenuOpen ? styles["navbar__mobile-menu--open"] : ""} lg:hidden`}>
                {/* Close button overlay */}
                <div
                    className={styles["navbar__mobile-overlay"]}
                    onClick={() => setIsMenuOpen(false)}
                ></div>

                <div className={styles["navbar__mobile-content"]}>
                    <a
                        href="#products"
                        className={`${styles["navbar__mobile-link"]} hover:text-primary transition-colors`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        PRODUCTS
                    </a>
                    <a
                        href="#about"
                        className={`${styles["navbar__mobile-link"]} hover:text-primary transition-colors`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        ABOUT
                    </a>
                    <a
                        href="#contact"
                        className={`${styles["navbar__mobile-link"]} hover:text-primary transition-colors`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        CONTACT
                    </a>
                    <div className={styles["navbar__mobile-shop"]}>
                        <span className={styles["shop-now"]}>SHOP NOW</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
