import type { Metadata } from "next";
import { Figtree, Baskervville, Italianno } from "next/font/google";

export const metadata: Metadata = {
	title: "Britblooms",
	description: "The art of living nature — bespoke botanical designs for indoor and outdoor spaces.",
};

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
				{/* Google Tag Manager */}
				<script dangerouslySetInnerHTML={{
					__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M79BG66T');`
				}} />
			</head>
			<body suppressHydrationWarning>
				{/* Google Tag Manager (noscript) */}
				<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M79BG66T" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
				{children}
			</body>
		</html>
	);
}
