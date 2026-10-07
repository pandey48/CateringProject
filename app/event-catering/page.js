import CateringLandingPage from "../../src/seo/CateringLandingPage";
import { cateringPages, getCateringPageMetadata } from "../../src/seo/cateringPages";

const slug = "event-catering";
export const metadata = getCateringPageMetadata(slug);
export default function Page() { return <CateringLandingPage page={cateringPages[slug]} slug={slug} />; }
