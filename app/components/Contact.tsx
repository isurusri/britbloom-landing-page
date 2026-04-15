"use client";

import Script from "next/script";
import styles from "./Contact.module.scss";

declare global {
    interface Window {
        Calendly?: {
            initPopupWidget: (opts: { url: string }) => void;
        };
    }
}

const CALENDLY_URL =
    "https://calendly.com/britblooms-support?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0b3c49&text_color=d9c8a9&primary_color=3e8e7e";

export default function Contact() {
    const openCalendly = () => {
        window.Calendly?.initPopupWidget({ url: CALENDLY_URL });
    };

    return (
        <div className={styles.wrapper}>
            <section className={styles.section}>
                <div className={styles.inner}>

                    {/* Left — editorial heading + contact info */}
                    <div className={styles.leftCol}>
                        <span className={styles.eyebrow}>Visit Us</span>
                        <h2 className={styles.heading}>
                            Let&rsquo;s meet<br />in&nbsp;person
                        </h2>

                        <p className={styles.subtext}>
                            Choose a time that works for you and we&rsquo;ll welcome you
                            in person. Whether you&rsquo;re planning a bespoke installation
                            or simply want to explore our work, we&rsquo;d love to meet.
                        </p>

                        <div className={styles.contactItems}>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Email</span>
                                <a href="mailto:info@britblooms.com" className={styles.contactValue}>
                                    info@britblooms.com
                                </a>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Phone</span>
                                <a href="tel:+441165095161" className={styles.contactValue}>
                                    +44 11 6509 5161
                                </a>
                            </div>
                        </div>

                        <div className={styles.accentLine} aria-hidden="true" />
                    </div>

                    {/* Right — appointment card */}
                    <div className={styles.rightCol}>
                        <div className={styles.card}>

                            {/* Subtle dot-grid decoration */}
                            <div className={styles.cardGrid} aria-hidden="true" />

                            <div className={styles.cardInner}>
                                <span className={styles.cardLabel}>Free Gallery Visit</span>

                                <p className={styles.cardTitle}>
                                    30 &#8209; minute<br />session
                                </p>

                                <ul className={styles.cardFeatures}>
                                    <li><span>—</span> Walk through your space &amp; vision</li>
                                    <li><span>—</span> Explore our portfolio in person</li>
                                    <li><span>—</span> Receive a tailored recommendation</li>
                                </ul>

                                <button className={styles.scheduleBtn} onClick={openCalendly}>
                                    <svg
                                        className={styles.calIcon}
                                        width="15" height="15"
                                        viewBox="0 0 15 15" fill="none"
                                        aria-hidden="true"
                                    >
                                        <rect x="0.75" y="2.25" width="13.5" height="12" rx="1.25" stroke="currentColor" strokeWidth="1.1" />
                                        <path d="M0.75 5.75h13.5" stroke="currentColor" strokeWidth="1.1" />
                                        <path d="M4.5 0.75v3M10.5 0.75v3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                                    </svg>
                                    Book a Meeting
                                </button>

                                <p className={styles.cardNote}>No commitment &nbsp;·&nbsp; Completely free</p>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Footer strip */}
                <footer className={styles.footer}>
                    <span className={styles.footerBrand}>© 2025 BritBlooms</span>
                    <span className={styles.footerTagline}>The art of living nature</span>
                    <a href="https://shop.britblooms.com" className={styles.footerShop}>
                        Visit Shop →
                    </a>
                </footer>

            </section>

            {/* Calendly assets — load after page is interactive */}
            {/* eslint-disable-next-line @next/next/no-css-tags */}
            <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
            <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
            />
        </div>
    );
}
