import LocationLandingPage from "../../src/seo/LocationLandingPage";
import { cateringLocations, getLocationMetadata } from "../../src/seo/cateringLocations";

const slug = "mirzapur";

export const metadata = getLocationMetadata(slug);

export default function MirzapurCateringPage() {
  return <LocationLandingPage location={cateringLocations[slug]} slug={slug} />;
}
