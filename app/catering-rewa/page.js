import LocationLandingPage from "../../src/seo/LocationLandingPage";
import { cateringLocations, getLocationMetadata } from "../../src/seo/cateringLocations";

const slug = "rewa";
export const metadata = getLocationMetadata(slug);
export default function Page() { return <LocationLandingPage location={cateringLocations[slug]} slug={slug} />; }
