import { Figtree, Baskervville, Italianno } from "next/font/google";

import "./globals.scss";

const figtree = Figtree({ variable: "--font-figtree" });
const baskervville = Baskervville({ variable: "--font-baskervville" });
const italianno = Italianno({
	variable: "--font-italianno",
	weight: "400",
	subsets: ["latin"]
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${figtree.variable} ${baskervville.variable} ${italianno.variable}`}>
			<head>
				<link rel="icon" href="/images/favicon_io/favicon.ico" sizes="any" />
				<link rel="icon" href="/images/favicon_io/favicon-16x16.png" sizes="16x16" type="image/png" />
				<link rel="icon" href="/images/favicon_io/favicon-32x32.png" sizes="32x32" type="image/png" />
				<link rel="apple-touch-icon" href="/images/favicon_io/apple-touch-icon.png" />
				<link rel="manifest" href="/images/favicon_io/site.webmanifest" />
			</head>
			<body>{children}</body>
		</html>
	);
}
