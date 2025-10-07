import styles from "./Contact.module.scss";

export default function Contact() {
    return (
        <div className={styles["wrapper"]}>

            <section className={`${styles["contact"]} py-20 px-8`}>
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className={`${styles["contact__hero"]} text-center mb-16`}>
                        <h2 className={`${styles["contact__title"]} text-5xl font-bold mb-6 text-white`}>
                            Let's Connect
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            For inquiries about Britblooms services or products, whether retail or wholesale, please contact us. Let us bring you closer to nature the art of living with nature.
                        </p>
                    </div>

                    {/* Main Contact Grid */}
                    <div className={`${styles["contact__main"]} grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16`}>
                        {/* Contact Methods */}
                        <div className={`${styles["contact__methods"]} lg:col-span-1`}>
                            <div className={`${styles["method__card"]} bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6`}>
                                <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">📧</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">Email Us</h3>
                                <p className="text-gray-300 mb-4">Get detailed responses within 24 hours</p>
                                <div className="text-primary font-semibold"><a href="mailto:info@britblooms.com">info@britblooms.com</a></div>
                            </div>

                            <div className={`${styles["method__card"]} bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6`}>
                                <div className="w-16 h-16 bg-gradient-to-br from-accent/30 to-primary/30 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">📞</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">Call Us</h3>
                                <p className="text-gray-300 mb-4">Speak directly with our experts</p>
                                <div className="text-primary font-semibold"><a href="tel:+441165095161">+44 11 6509 5161</a></div>
                            </div>

                            {/* <div className={`${styles["method__card"]} bg-white/10 backdrop-blur-sm rounded-2xl p-8`}>
                                <div className="w-16 h-16 bg-gradient-to-br from-neutral/30 to-accent/30 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">📍</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">Visit Us</h3>
                                <p className="text-gray-300 mb-4">Come see our showroom</p>
                                <div className="text-primary font-semibold">123 Aquatic Street<br />London, UK SW1A 1AA</div>
                            </div> */}
                        </div>

                        {/* Contact Form */}
                        <div className={`${styles["contact__form"]} lg:col-span-2`}>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                                <h3 className="text-2xl font-semibold text-white mb-8">Send us a message</h3>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-white text-sm font-semibold mb-2">First Name</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white text-sm font-semibold mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-white text-sm font-semibold mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
                                            placeholder="john.doe@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white text-sm font-semibold mb-2">Subject</label>
                                        <select className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:border-primary transition-colors">
                                            <option value="">Select a topic</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="products">Product Information</option>
                                            <option value="support">Technical Support</option>
                                            <option value="consultation">Free Consultation</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-white text-sm font-semibold mb-2">Message</label>
                                        <textarea
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:border-primary transition-colors resize-none"
                                            placeholder="Tell us about your aquatic project or any questions you have..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary/80 transition-all hover:scale-105"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </section>

        </div>
    );
}