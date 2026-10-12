
import { cateringLocations } from "../src/seo/cateringLocations";
import { cateringPages } from "../src/seo/cateringPages";

const site = "https://www.pandeycatering.in";
const urls = [
  "",
  "/services",
  ...Object.keys(cateringPages).map((slug) => `/${slug}`),
  ...Object.keys(cateringLocations).map((slug) => `/catering-${slug}`),
];

export default function sitemap() {
  return urls.map((path) => ({ url: `${site}${path}` }));
}
