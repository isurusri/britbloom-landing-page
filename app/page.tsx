import Link from "next/link";
import Image from "next/image";
import Hero from "./hero";

import styles from "./page.module.scss";

const Home = () => {
	return (
		<div className={styles["page"]}>
			<header className={styles["page__header"]}>
				<span className={styles["page__header-i-about"]}>ABOUT</span>
				<span className={styles["page__header-i-contact"]}>CONTACT</span>
				{/*<span className={styles["page__header-i-branding"]}>BRITBLOOMS</span>*/}
				<span className={styles["page__header-i-branding"]}>
					<Image alt="logo" src="./images/britblooms.svg" width={40} height={40}></Image>
				</span>
				<span className={styles["page__header-i-shop"]}>
					<span className={styles["shop-now"]}>SHOP NOW</span>
				</span>
			</header>
			<section id="hero">
				<Hero />
			</section>
		</div>
	);
};

export default Home;
