"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Products.module.scss";

const products = [
    {
        id: 1,
        title: "Paludariums",
        emoji: "🌿",
        image: "/images/products/paludarium01.png",
        description: "At Britblooms, we bring nature indoors with our stunning paludarium plant designs. Blending lush greenery with flowing water, our creations capture the beauty of swamps, marshes, and rainforests offering you a living piece of nature to enjoy every day.",
        features: [
            "🌿 Brings nature indoors – A paludarium recreates natural ecosystems like rainforests and wetlands",
            "💧 Soothing and relaxing – The combination of water, plants, and sometimes small animals creates a calming atmosphere",
            "🍃 Improves air quality – Live plants in the paludarium naturally purify the air",
            "🌱 Educational and inspiring – Perfect for children and adults alike",
            "✨ Unique home décor – It's not just a habitat—it's a living art piece"
        ],
        gradient: "from-green-500/20 to-blue-500/20"
    },
    {
        id: 2,
        title: "Aquascaped Tanks",
        emoji: "🌊",
        image: "/images/products/aquascaped01.png",
        description: "Aquascaped tanks are living works of art that bring the beauty of underwater landscapes right into your home. With carefully arranged aquatic plants, rocks, driftwood, and décor, these tanks recreate the harmony of rivers, lakes, and aquatic gardens.",
        features: [
            "🌊 Capturing natural beauty – Every glance feels like looking into a serene riverbed",
            "🌿 Creating calm and relaxation – Flowing water and vibrant greenery help ease stress",
            "🍃 Boosting air freshness – Live aquatic plants contribute to a healthier indoor environment",
            "✨ Bringing life to your space – An aquascape is a living, breathing piece of nature"
        ],
        gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
        id: 3,
        title: "Terrariums",
        emoji: "🏞️",
        image: "/images/products/terrariums01.png",
        description: "Terrariums are miniature gardens enclosed in glass containers, designed to replicate natural ecosystems. They bring together soil, moss, plants, and decorative elements, creating a small, self-sustaining world of greenery that thrives indoors.",
        features: [
            "🍃 Closer to nature – Experience the calming presence of plants without needing a big garden",
            "🏡 Beautiful décor – Terrariums add elegance and a modern natural touch to any room",
            "🌿 Low maintenance – Many terrarium plants require minimal care",
            "💧 Health benefits – Plants improve indoor air quality and create a soothing environment",
            "🌟 Personal touch – Each terrarium can be customized with unique plants"
        ],
        gradient: "from-emerald-500/20 to-green-500/20"
    },
    {
        id: 4,
        title: "Luxury Vertical Gardens",
        emoji: "🌱",
        image: "/images/products/verticalgarden01.png",
        description: "At Britblooms, we transform walls into living works of art with our bespoke vertical gardens. Designed to bring a refined sense of nature into your interiors, our creations combine elegance, tranquility, and timeless style.",
        features: [
            "🎨 Bespoke designs tailored to your space",
            "🌿 Premium plants and exclusive products",
            "✨ Contemporary to sophisticated displays",
            "🏛️ Elevates environments into sanctuaries of beauty",
            "💎 Nature becomes a statement of luxury"
        ],
        gradient: "from-lime-500/20 to-emerald-500/20"
    },
    {
        id: 5,
        title: "Premium Plant Designs & Moss Art",
        emoji: "🖼️",
        image: "/images/products/mossart01.png",
        description: "At Britblooms, we create premium plant designs and bespoke moss art that bring the calming essence of nature into your space. Each design is tailored to suit your style and surroundings, transforming ordinary spaces into refreshing green sanctuaries.",
        features: [
            "🌿 Carefully selected greenery with aesthetic arrangements",
            "🖼️ Living or preserved botanical artworks crafted from natural moss",
            "✨ Unique, sustainable, and low-maintenance touch of greenery",
            "🏢 Perfect for home, office, or commercial spaces",
            "💚 Promotes well-being by reducing stress and improving air quality"
        ],
        gradient: "from-teal-500/20 to-green-500/20"
    },
    {
        id: 6,
        title: "Designer Water Features",
        emoji: "💧",
        image: "/images/products/fountain01.png",
        description: "At Britblooms, we create designer water features customized and aesthetically crafted water installations that transform homes, gardens, offices, and public spaces. Our water features go beyond simply providing flowing water; they are designed to enhance visual appeal and create ambiance.",
        features: [
            "⛲ Fountains in modern, classical, or abstract styles",
            "🏞️ Ponds and water gardens bringing natural serenity",
            "🌊 Water walls with elegant vertical surfaces",
            "🎨 Sculptural water features with bespoke artwork",
            "💡 Custom-tailored designs with lighting and textures"
        ],
        gradient: "from-cyan-500/20 to-blue-500/20"
    }
];

export default function Products() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const currentProduct = products[currentSlide];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % products.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div className={styles["wrapper"]}>
            <section className={`${styles["products"]} py-20 px-8`}>
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className={`${styles["products__hero"]} text-center mb-16`}>
                        <h2 className={`${styles["products__title"]} text-5xl font-bold mb-6 text-white`}>
                            Our Products
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            We embrace the art of living nature bringing you closer to the beauty of
                            the natural world, whether in your indoor or outdoor spaces.
                        </p>
                    </div>

                    <div className={`${styles["products__layout"]} grid grid-cols-1 lg:grid-cols-2 gap-8`}>
                        {/* Left Section - Slideshow */}
                        <div className={`${styles["products__gallery"]}`}>
                            <div className={`${styles["slideshow__container"]} mb-4`}>
                                {/* Main Image Display */}
                                <div className={`${styles["slideshow__main"]} relative rounded-2xl overflow-hidden mb-4`}>
                                    <div className="aspect-[4/3] relative">
                                        <Image
                                            src={currentProduct.image}
                                            alt={currentProduct.title}
                                            fill
                                            className="object-cover transition-all duration-500"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>

                                    {/* Navigation Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={prevSlide}
                                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                                        >
                                            <span className="text-lg">‹</span>
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                                        >
                                            <span className="text-lg">›</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Thumbnail Navigation */}
                                <div className={`${styles["slideshow__thumbnails"]} grid grid-cols-6 gap-1 mb-3`}>
                                    {products.map((product, index) => (
                                        <button
                                            key={product.id}
                                            onClick={() => goToSlide(index)}
                                            className={`${styles["thumbnail"]} aspect-square rounded-md overflow-hidden transition-all duration-300 ${index === currentSlide
                                                ? 'ring-2 ring-primary scale-105'
                                                : 'opacity-60 hover:opacity-100 hover:scale-105'
                                                }`}
                                        >
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={product.image}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 16vw, 8vw"
                                                />
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Slide Counter and Navigation */}
                                <div className={`${styles["slideshow__navigation"]} flex items-center justify-between`}>
                                    <div className="text-white/60 text-sm">
                                        {String(currentSlide + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={prevSlide}
                                            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                        >
                                            ‹
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                        >
                                            ›
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Product Content */}
                        <div className={`${styles["products__content"]}`}>
                            <h2 className={`${styles["products__title"]} text-3xl font-bold mb-4 text-white`}>
                                {currentProduct.title}
                            </h2>
                            <p className="text-base text-gray-300 leading-relaxed mb-4">
                                {currentProduct.description}
                            </p>

                            {/* Features List */}
                            <div className="space-y-2">
                                {currentProduct.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-2 text-gray-300">
                                        <span className="text-base flex-shrink-0">{feature.split(' ')[0]}</span>
                                        <span className="text-sm leading-relaxed">{feature.substring(feature.indexOf(' ') + 1)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
