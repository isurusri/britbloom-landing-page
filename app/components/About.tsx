import styles from "./About.module.scss";

export default function About() {
    return (
        <section className={`${styles["about"]} py-20 px-8`}>
            <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className={`${styles["about__hero"]} text-center mb-16`}>
                    <h2 className={`${styles["about__title"]} text-5xl font-bold mb-6 text-white`}>
                        About BritBlooms
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        We specialise in high-quality pond and aquarium supplies for everyone from seasoned aquatic
                        enthusiasts to complete beginners. Our mission is to help you create and maintain beautiful,
                        healthy aquatic environments.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className={`${styles["about__content"]} grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16`}>
                    {/* Left - Large Image */}
                    <div className={`${styles["about__image"]} order-2 lg:order-1`}>
                        <div className="relative">
                            <div className="aspect-[4/3] bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl overflow-hidden flex items-center justify-center">
                                <span className="text-8xl">🐠</span>
                            </div>
                            <div className={`${styles["image__badge"]} absolute -bottom-6 -right-6 bg-primary text-white px-6 py-3 rounded-full font-semibold`}>
                                15+ Years Experience
                            </div>
                        </div>
                    </div>

                    {/* Right - Text Content */}
                    <div className={`${styles["about__text"]} order-1 lg:order-2`}>
                        <h3 className="text-3xl font-bold text-white mb-6">Our Story</h3>
                        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                            Founded in 2008, BritBlooms began as a small family business with a passion for aquatic life.
                            What started as a hobby in our founder's backyard pond has grown into the UK's leading
                            supplier of premium aquatic supplies.
                        </p>
                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            We understand that every aquatic environment is unique, which is why we offer personalized
                            consultations and carefully curated products that meet the highest standards of quality and reliability.
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

                {/* Stats Section */}
                <div className={`${styles["about__stats"]} grid grid-cols-2 md:grid-cols-4 gap-8 mb-16`}>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">15+</div>
                        <div className="text-gray-300">Years Experience</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                        <div className="text-gray-300">Happy Customers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                        <div className="text-gray-300">Projects Completed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">4.9</div>
                        <div className="text-gray-300">Customer Rating</div>
                    </div>
                </div>

                {/* Team Section */}
                <div className={`${styles["about__team"]} text-center`}>
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
                </div>
            </div>
        </section>
    );
}

