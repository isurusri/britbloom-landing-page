"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNavbarHidden, setIsNavbarHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show navbar when at the top or when mouse is near top
            if (currentScrollY < 10 || mouseY < 100) {
                setIsNavbarHidden(false);
            }
            // Hide navbar when scrolling down, show when scrolling up
            else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsNavbarHidden(true);
            } else if (currentScrollY < lastScrollY) {
                setIsNavbarHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        const handleMouseMove = (e: MouseEvent) => {
            setMouseY(e.clientY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [lastScrollY, mouseY]);

    return (
        <>
            <header className={`${styles["navbar"]} ${isNavbarHidden ? styles["navbar--hidden"] : ""} flex items-center p-2 text-white relative`}>
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
                    <a href="/shop" className={`${styles["shop-now"]} hidden lg:block`}>
                        SHOP NOW
                    </a>

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
                        <a href="/shop" className={styles["shop-now"]}>SHOP NOW</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
