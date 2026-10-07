import Booking from "../../src/WebPages/Booking";

export const metadata = {
  title: "Catering & Event Booking in Hanumana",
  description: "Contact Pandey Catering to discuss your event date, guest count and catering requirements in Hanumana, Madhya Pradesh.",
  alternates: { canonical: "/booking" },
  openGraph: { type: "website", locale: "en_IN", url: "https://www.pandeycatering.in/booking", siteName: "Pandey Catering", title: "Catering & Event Booking in Hanumana | Pandey Catering", description: "Contact Pandey Catering to discuss your event date, guest count and catering requirements in Hanumana, Madhya Pradesh." },
  twitter: { card: "summary_large_image", title: "Catering & Event Booking in Hanumana | Pandey Catering", description: "Contact Pandey Catering to discuss your event date, guest count and catering requirements in Hanumana, Madhya Pradesh.", images: ["https://www.pandeycatering.in/images/pandey-catering-social-preview.webp"] },
};

export default function BookingPage() {
  return <Booking />;
}
