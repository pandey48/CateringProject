import LocationLandingPage from "../../src/seo/LocationLandingPage";
import { cateringLocations, getLocationMetadata } from "../../src/seo/cateringLocations";

const slug = "jabalpur";

export const metadata = getLocationMetadata(slug);

export default function JabalpurCateringPage() {
  return <LocationLandingPage location={cateringLocations[slug]} slug={slug} />;
}
