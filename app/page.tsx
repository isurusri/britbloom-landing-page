import Link from "next/link";
import Image from "next/image";
import Hero from "./hero";
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";

import styles from "./page.module.scss";

const Home = () => {
	return (
		<div className={`${styles["page"]} bg-white`}>
			<header className={`${styles["page__header"]} flex justify-between items-center p-4 text-white`}>
				<div className="flex gap-8">
					<a href="#products" className={`${styles["page__header-i-products"]} hover:text-primary transition-colors`}>PRODUCTS</a>
					<a href="#about" className={`${styles["page__header-i-about"]} hover:text-primary transition-colors`}>ABOUT</a>
					<a href="#contact" className={`${styles["page__header-i-contact"]} hover:text-primary transition-colors`}>CONTACT</a>
				</div>
				<a href="#hero" className={styles["page__header-i-branding"]}>BRITBLOOMS</a>
				{/*<span className={styles["page__header-i-branding"]}>
					<Image alt="logo" src="./images/britblooms.svg" width={40} height={40}></Image>
				</span>*/}
				<span className={styles["page__header-i-shop"]}>
					<span className={styles["shop-now"]}>SHOP NOW</span>
				</span>
			</header>
			<section id="hero">
				<Hero />
			</section>
			<section id="products">
				<Products />
			</section>
			<section id="about">
				<About />
			</section>
			<section id="contact">
				<Contact />
			</section>
		</div>
	);
};

export default Home;
