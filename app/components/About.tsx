"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./About.module.scss";

const aboutImages = [
    {
        id: 1,
        src: "/images/about/paludarium.png",
        alt: "Paludarium Design",
        title: "Paludarium Creations"
    },
    {
        id: 2,
        src: "/images/about/aquascaped.png",
        alt: "Aquascaped Tank",
        title: "Aquascaped Tanks"
    },
    {
        id: 3,
        src: "/images/about/terrariums.png",
        alt: "Terrarium Design",
        title: "Terrarium Gardens"
    },
    {
        id: 4,
        src: "/images/about/verticalgarden.png",
        alt: "Vertical Garden",
        title: "Vertical Gardens"
    },
    {
        id: 5,
        src: "/images/about/mossart .png",
        alt: "Moss Art",
        title: "Moss Art Designs"
    },
    {
        id: 6,
        src: "/images/about/ponds.png",
        alt: "Water Features",
        title: "Water Features"
    }
];

export default function About() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto slideshow effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % aboutImages.length);
        }, 5000); // Change slide every 5 seconds for smoother experience

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % aboutImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + aboutImages.length) % aboutImages.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };
    return (
        <div className={styles["wrapper"]}>

            <section className={`${styles["about"]} py-20 px-8`}>
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className={`${styles["about__hero"]} text-center mb-16`}>
                        <h2 className={`${styles["about__title"]} text-5xl font-bold mb-6 text-white`}>
                            About BritBlooms
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            At BritBlooms, our passion is rooted in Nature, Design, and Harmony.
                            We embrace the art of living nature bringing you closer to the beauty of the natural world, whether in your indoor or outdoor spaces.
                        </p>
                    </div>

                    {/* Main Content - Slideshow */}
                    <div className={`${styles["about__content"]} grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16`}>
                        {/* Left - Image Slideshow */}
                        <div className={`${styles["about__slideshow"]} order-2 lg:order-1`}>
                            <div className="relative">
                                {/* Main Slideshow Container */}
                                <div className={`${styles["slideshow__container"]} relative rounded-3xl overflow-hidden`}>
                                    <div className="aspect-[4/3] relative">
                                        <div className="relative w-full h-full">
                                            {aboutImages.map((image, index) => (
                                                <div
                                                    key={image.id}
                                                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                                                        ? 'opacity-100 scale-100'
                                                        : 'opacity-0 scale-105'
                                                        }`}
                                                >
                                                    <Image
                                                        src={image.src}
                                                        alt={image.alt}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                                        {/* Image Title Overlay */}
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h4 className="text-xl font-semibold transition-all duration-500 ease-in-out">
                                                {aboutImages[currentSlide].title}
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Navigation Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={prevSlide}
                                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                                        >
                                            <span className="text-xl">‹</span>
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                                        >
                                            <span className="text-xl">›</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Slide Indicators */}
                                <div className="flex justify-center gap-2 mt-6">
                                    {aboutImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                                ? 'bg-primary scale-125'
                                                : 'bg-white/30 hover:bg-white/50'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right - Text Content */}
                        <div className={`${styles["about__text"]} order-1 lg:order-2`}>
                            <h3 className="text-3xl font-bold text-white mb-6">Story</h3>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                Our creations include paludariums, aquascaped tanks, terrariums, and vertical gardens, Premium plant designs and Moss Art , thoughtfully crafted to bring the essence of nature into your home, office, or workplace.
                            </p>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                As hobbyists and nature lovers, we take pride in sharing the artistry of living nature. We believe the little things matter—attention to detail, refinement, and quality are at the heart of everything we do.
                            </p>
                            <div className={`${styles["about__features"]} space-y-4`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">✓</span>
                                    </div>
                                    <span className="text-white font-medium">Expert Knowledge & Support</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">✓</span>
                                    </div>
                                    <span className="text-white font-medium">Premium Quality Products</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">✓</span>
                                    </div>
                                    <span className="text-white font-medium">Sustainable & Eco-Friendly</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Team Section */}
                    {/* <div className={`${styles["about__team"]} text-center`}>
                        <h3 className="text-3xl font-bold text-white mb-8">Meet Our Team</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className={`${styles["team__member"]} bg-white/10 backdrop-blur-sm rounded-2xl p-6`}>
                                <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-3xl">👨‍🔬</span>
                                </div>
                                <h4 className="text-xl font-semibold text-white mb-2">Dr. Sarah Chen</h4>
                                <p className="text-gray-300 text-sm mb-3">Lead Aquatic Biologist</p>
                                <p className="text-gray-400 text-sm">15+ years specializing in freshwater ecosystems and fish health.</p>
                            </div>
                            <div className={`${styles["team__member"]} bg-white/10 backdrop-blur-sm rounded-2xl p-6`}>
                                <div className="w-20 h-20 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-3xl">👩‍💼</span>
                                </div>
                                <h4 className="text-xl font-semibold text-white mb-2">Michael Thompson</h4>
                                <p className="text-gray-300 text-sm mb-3">Customer Success Manager</p>
                                <p className="text-gray-400 text-sm">Ensuring every customer gets the perfect solution for their needs.</p>
                            </div>
                            <div className={`${styles["team__member"]} bg-white/10 backdrop-blur-sm rounded-2xl p-6`}>
                                <div className="w-20 h-20 bg-gradient-to-br from-neutral/30 to-accent/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-3xl">👨‍🔧</span>
                                </div>
                                <h4 className="text-xl font-semibold text-white mb-2">James Wilson</h4>
                                <p className="text-gray-300 text-sm mb-3">Technical Specialist</p>
                                <p className="text-gray-400 text-sm">Expert in filtration systems and water treatment technologies.</p>
                            </div>
                        </div>
                    </div> */}

                    {/* Our Mission Section */}
                    <div className={`${styles["about__mission"]} text-center`}>
                        <h3 className="text-3xl font-bold text-white mb-8">Our Mission</h3>
                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            To deliver only the best, helping you experience the harmony and inspiration that nature brings into everyday life.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
}

