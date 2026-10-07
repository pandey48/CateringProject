import ServicesPage from "../../src/WebPages/ServicesPage";

export const metadata = {
  title: "Catering & Event Services in Hanumana",
  description: "Explore wedding, party, vegetarian and event catering, professional cooks, decoration and complete event services from Pandey Catering in Hanumana.",
  alternates: { canonical: "/services" },
  openGraph: { type: "website", locale: "en_IN", url: "https://www.pandeycatering.in/services", siteName: "Pandey Catering", title: "Catering & Event Services in Hanumana | Pandey Catering", description: "Explore wedding, party, vegetarian and event catering, professional cooks, decoration and complete event services from Pandey Catering in Hanumana." },
  twitter: { card: "summary_large_image", title: "Catering & Event Services in Hanumana | Pandey Catering", description: "Explore wedding, party, vegetarian and event catering, professional cooks, decoration and complete event services from Pandey Catering in Hanumana.", images: ["https://www.pandeycatering.in/images/pandey-catering-social-preview.webp"] },
};

export default function ServicesRoute() {
  return <ServicesPage />;
}
