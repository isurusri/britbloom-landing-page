import styles from "./Products.module.scss";

export default function Products() {
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
                            Discover our comprehensive range of premium aquatic supplies designed to help you create and maintain
                            beautiful, healthy aquatic environments for every level of expertise.
                        </p>
                    </div>

                    <div className={`${styles["products__layout"]} grid grid-cols-1 lg:grid-cols-3 gap-12`}>
                        {/* Left Section - Image Gallery */}
                        <div className={`${styles["products__gallery"]} lg:col-span-2`}>
                            <div className={`${styles["gallery__container"]} mb-6`}>
                                <div className={`${styles["gallery__images"]} grid grid-cols-3 gap-4`}>
                                    <div className={`${styles["gallery__image"]} rounded-2xl overflow-hidden`}>
                                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                            <span className="text-4xl">🐠</span>
                                        </div>
                                    </div>
                                    <div className={`${styles["gallery__image"]} rounded-2xl overflow-hidden`}>
                                        <div className="aspect-video bg-gradient-to-br from-neutral/20 to-accent/20 flex items-center justify-center">
                                            <span className="text-4xl">🌊</span>
                                        </div>
                                    </div>
                                    <div className={`${styles["gallery__image"]} rounded-2xl overflow-hidden`}>
                                        <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                                            <span className="text-4xl">🌿</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles["gallery__navigation"]} flex items-center justify-between mt-4`}>
                                    <div className="text-white/60 text-sm">01 / 03</div>
                                    <div className="flex gap-2">
                                        <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                                            &lt;
                                        </button>
                                        <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                                            &gt;
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles["products__content"]}`}>
                                <h2 className={`${styles["products__title"]} text-4xl font-bold mb-6 text-white`}>
                                    Aqua Excellence: Premium Aquatic Solutions
                                </h2>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    In our comprehensive aquatic supplies collection, we integrate cutting-edge technology
                                    with natural design principles to create the perfect environment for your aquatic
                                    ecosystem. From advanced filtration systems to eco-friendly treatments.
                                </p>
                            </div>
                        </div>

                        {/* Right Section - Product Details & Stats */}
                        <div className={`${styles["products__sidebar"]} lg:col-span-1`}>
                            <div className={`${styles["sidebar__image"]} rounded-2xl overflow-hidden mb-8`}>
                                <div className="aspect-square bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                                    <span className="text-6xl">🏞️</span>
                                </div>
                            </div>

                            <div className={`${styles["sidebar__stats"]} grid grid-cols-3 gap-6 mb-8`}>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary mb-2">150+</div>
                                    <div className="text-sm text-gray-300">Products Available</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary mb-2">1200+</div>
                                    <div className="text-sm text-gray-300">Happy Customers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                                    <div className="text-sm text-gray-300">Orders Delivered</div>
                                </div>
                            </div>

                            <div className={`${styles["sidebar__rating"]} flex items-center gap-2 mb-6`}>
                                <div className="flex text-yellow-400">
                                    <span className="text-lg">★</span>
                                </div>
                                <span className="text-white font-semibold">4.8</span>
                            </div>

                            <button className={`${styles["sidebar__button"]} w-full bg-primary text-white py-4 rounded-2xl font-semibold hover:bg-primary/80 transition-colors`}>
                                View All Products
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
