import dynamic from "next/dynamic";
import Hero from "./hero";
import Navbar from "./components/Navbar";

const Creations = dynamic(() => import("./components/Creations"));
const Products = dynamic(() => import("./components/Products"));
const About = dynamic(() => import("./components/About"));
const Contact = dynamic(() => import("./components/Contact"));

import styles from "./page.module.scss";

const Home = () => {
	return (
		<div className={`${styles["page"]} bg-white`}>
			<Navbar />
			<section id="hero">
				<Hero />
			</section>
			<section id="creations">
				<Creations />
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
