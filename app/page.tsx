import Link from "next/link";
import Image from "next/image";
import Hero from "./hero";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";

import styles from "./page.module.scss";

const Home = () => {
	return (
		<div className={`${styles["page"]} bg-white`}>
			<Navbar />
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
