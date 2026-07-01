"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNavbarHidden, setIsNavbarHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setIsScrolled(currentScrollY > 24);

            if (currentScrollY < 10 || mouseY < 100) {
                setIsNavbarHidden(false);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsNavbarHidden(true);
            } else if (currentScrollY < lastScrollY) {
                setIsNavbarHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        const handleMouseMove = (e: MouseEvent) => {
            setMouseY(e.clientY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [lastScrollY, mouseY]);

    const navClass = [
        styles.navbar,
        isNavbarHidden ? styles["navbar--hidden"] : "",
        isScrolled ? styles["navbar--scrolled"] : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <>
            <header className={navClass}>
                {/* Left — desktop nav links */}
                <nav className={styles.nav}>
                    <a href="#creations" className={styles.navLink}>Creations</a>
                    <a href="#products" className={styles.navLink}>Products</a>
                    <a href="#about" className={styles.navLink}>About</a>
                    <a href="#contact" className={styles.navLink}>Contact</a>
                </nav>

                {/* Center — logo */}
                <a href="#hero" className={styles.logo} aria-label="BritBlooms home">
                    <Image
                        src="/images/britblooms.svg"
                        alt="BritBlooms"
                        width={36}
                        height={36}
                        className={styles.logoImg}
                    />
                </a>

                {/* Right — shop + hamburger */}
                <div className={styles.right}>
                    <a href="https://shop.britblooms.com" className={styles.shopBtn}>
                        Shop Now
                    </a>
                    <button
                        className={styles.hamburgerBtn}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className={`${styles.hamburger} ${isMenuOpen ? styles["hamburger--open"] : ""}`}>
                            <span />
                            <span />
                            <span />
                        </span>
                    </button>
                </div>
            </header>

            {/* Mobile fullscreen menu */}
            <div
                className={`${styles.mobileMenu} ${isMenuOpen ? styles["mobileMenu--open"] : ""}`}
                aria-hidden={!isMenuOpen}
            >
                <div className={styles.mobileBackdrop} onClick={() => setIsMenuOpen(false)} />
                <nav className={styles.mobileNav}>
                    {["creations", "products", "about", "contact"].map((id) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={styles.mobileLink}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                        </a>
                    ))}
                    <a
                        href="https://shop.britblooms.com"
                        className={styles.mobileShop}
                    >
                        Shop Now
                    </a>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
