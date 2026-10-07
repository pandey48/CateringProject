const site = "https://www.pandeycatering.in";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site}/sitemap.xml`,
  };
}
