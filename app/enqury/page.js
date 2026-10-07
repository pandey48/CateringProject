import Enqury from "../../src/WebPages/Enqury";

export const metadata = {
  title: "Catering Enquiry in Hanumana",
  description: "Share your name, event date and guest count with Pandey Catering to begin planning your event in Hanumana, Madhya Pradesh.",
  alternates: { canonical: "/enqury" },
  robots: { index: false, follow: true },
};

export default function EnquryPage() {
  return <Enqury />;
}
