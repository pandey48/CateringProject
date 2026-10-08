import LocationLandingPage from "../../src/seo/LocationLandingPage";
import { cateringLocations, getLocationMetadata } from "../../src/seo/cateringLocations";

const slug = "prayagraj";

export const metadata = getLocationMetadata(slug);

export default function PrayagrajCateringPage() {
  return <LocationLandingPage location={cateringLocations[slug]} slug={slug} />;
}
