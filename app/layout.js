import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.pandeycatering.in"),
  title: {
    default: "Pandey Catering | Wedding & Event Catering in Hanumana",
    template: "%s | Pandey Catering",
  },
  description: "Pandey Catering offers wedding, party, event and vegetarian catering in Hanumana, Mauganj, Rewa and Sidhi in Madhya Pradesh, and Nagpur in Maharashtra. Contact us to discuss menus and bookings.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.pandeycatering.in/",
    siteName: "Pandey Catering",
    title: "Pandey Catering | Wedding & Event Catering in Hanumana",
    description: "Wedding, party, event and vegetarian catering in Hanumana, Mauganj, Rewa and Sidhi in Madhya Pradesh, and Nagpur in Maharashtra.",
    images: [{ url: "/images/pandey-catering-social-preview.webp", width: 1200, height: 630, alt: "Catering buffet prepared for an event by Pandey Catering" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pandey Catering | Wedding & Event Catering in Hanumana",
    description: "Wedding, party, event and vegetarian catering in Hanumana, Mauganj, Rewa and Sidhi in Madhya Pradesh, and Nagpur in Maharashtra.",
    images: ["/images/pandey-catering-social-preview.webp"],
  },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.pandeycatering.in/#organization",
  name: "Pandey Catering",
  url: "https://www.pandeycatering.in/",
  telephone: "+917389368597",
  email: "pandeycatering@gmail.com",
  logo: "https://www.pandeycatering.in/pandey-catering-logo.webp",
  image: "https://www.pandeycatering.in/images/pandey-catering-event-buffet.webp",
  description: "Wedding, party, event and vegetarian catering in Hanumana, Mauganj, Rewa and Sidhi in Madhya Pradesh, and Nagpur in Maharashtra.",
  areaServed: ["Hanumana, Madhya Pradesh", "Mauganj, Madhya Pradesh", "Rewa, Madhya Pradesh", "Sidhi, Madhya Pradesh", "Nagpur, Maharashtra"],
  knowsAbout: ["Wedding catering", "Party catering", "Event catering", "Vegetarian food catering", "Religious and family function catering"],
  sameAs: ["https://www.instagram.com/pandey_caterrs"],
  contactPoint: { "@type": "ContactPoint", telephone: "+917389368597", contactType: "customer service", availableLanguage: ["English", "Hindi"] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      </body>
    </html>
  );
}
