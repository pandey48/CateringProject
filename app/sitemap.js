
import { cateringLocations } from "../src/seo/cateringLocations";

const site = "https://www.pandeycatering.in";
const urls = [
  "",
  "/services",
  "/booking",
  "/wedding-catering",
  "/party-catering",
  "/event-catering",
  "/vegetarian-catering",
  "/religious-function-catering",
];
const locationUrls = Object.keys(cateringLocations).map((slug) => `/catering-${slug}`);

export default function sitemap() {
  return [...urls, ...locationUrls].map((path) => ({
    url: `${site}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/services" ? 0.9 : 0.8,
  }));
}
