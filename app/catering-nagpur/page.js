import LocationLandingPage from "../../src/seo/LocationLandingPage";
import { cateringLocations, getLocationMetadata } from "../../src/seo/cateringLocations";

const slug = "nagpur";

export const metadata = getLocationMetadata(slug);

export default function NagpurCateringPage() {
  return <LocationLandingPage location={cateringLocations[slug]} slug={slug} />;
}