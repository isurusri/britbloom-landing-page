export const metadata = {
	title: "BritBlooms | The UK's Premier Living Nature Gallery – Leicester",
	description:
		"Visit our Leicester gallery to explore stunning paludariums, terrariums & living art in person. Walk-ins welcome, free parking, free design consultation.",
};

export default function PromoPage() {
	return (
		<iframe
			src="/promo-page/britblooms-landing.html"
			style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: "none" }}
			title="BritBlooms Promotion"
		/>
	);
}
