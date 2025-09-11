import { Figtree, Baskervville } from "next/font/google";

import "./globals.scss";

const figtree = Figtree({ variable: "--font-figtree" });
const baskervville = Baskervville({ variable: "--font-baskervville" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${figtree.variable} ${baskervville.variable}`}>
			<body>{children}</body>
		</html>
	);
}
