import "./globals.css";

export const metadata = {
  title: "Pandey Event Management | Event Services & Event Planning",
  description: "Pandey Event Management helps you plan weddings, birthdays, corporate events and other occasions with catering, decoration, tent, photography, DJ and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
