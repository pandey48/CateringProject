export const cateringLocations = {
  hanumana: {
    name: "Hanumana",
    region: "Madhya Pradesh",
    heading: "Catering Service in Hanumana",
    title: "Catering Service in Hanumana, Madhya Pradesh",
    description: "Pandey Catering helps families and event hosts in Hanumana plan food service for weddings, parties, religious functions and other gatherings. Share your date and guest estimate to discuss menu choices and service arrangements.",
    metaDescription: "Looking for catering in Hanumana? Pandey Catering discusses wedding, party, vegetarian and family function menus with event hosts in Hanumana, Madhya Pradesh.",
    localDetails: "Planning an event in Hanumana starts with a few practical details: the occasion, date, venue and estimated number of guests. Pandey Catering can discuss how the meal should fit the programme, what vegetarian or family-preferred food to consider, and how guests will be served. Final menus and availability are confirmed directly with the team.",
    faq: [
      ["What catering services are available in Hanumana?", "Pandey Catering takes enquiries for wedding, party, event, vegetarian and religious or family function catering in Hanumana."],
      ["Can you help plan food for a wedding in Hanumana?", "Yes. Share the wedding date, guest estimate and menu preferences to discuss food service for your event."],
      ["How do I check availability?", "Call +91 73893 68597 or use the enquiry form with your name, event date and guest count. The team will follow up to discuss the details."],
    ],
  },
  mauganj: {
    name: "Mauganj",
    region: "Madhya Pradesh",
    heading: "Catering Service in Mauganj",
    title: "Catering Service in Mauganj, Madhya Pradesh",
    description: "Pandey Catering serves event hosts in Mauganj with catering for weddings, parties and family functions. Share your date, expected guest count and food preferences to begin planning a suitable service arrangement.",
    metaDescription: "Plan wedding, party, vegetarian or family function catering in Mauganj with Pandey Catering. Discuss your date, guest count and menu requirements.",
    localDetails: "For an event in Mauganj, it helps to plan the meal around the venue schedule and number of guests. Pandey Catering can discuss family-preferred dishes, vegetarian choices and how service should fit the event programme. Contact the team to confirm the arrangements for your date and venue.",
    faq: [
      ["Do you provide catering in Mauganj?", "Pandey Catering lists Mauganj among its service areas. Contact the team with your event date to check availability and arrangements."],
      ["Can I plan a vegetarian wedding menu in Mauganj?", "Yes. Share your preferred dishes and guest requirements so the team can discuss suitable menu choices."],
      ["What details should I send for an estimate?", "Start with your name, event date and expected guest count. The team can follow up about the venue and menu."],
    ],
  },
  rewa: {
    name: "Rewa",
    region: "Madhya Pradesh",
    heading: "Wedding & Event Catering in Rewa",
    title: "Wedding & Event Catering in Rewa, Madhya Pradesh",
    description: "Pandey Catering provides event catering for customers in Rewa, including weddings, parties and family gatherings. Begin by sharing the date and guest estimate, then discuss menu preferences and serving needs with the team.",
    metaDescription: "Looking for wedding or event catering in Rewa? Contact Pandey Catering to discuss vegetarian menus, guest numbers and food service for your occasion.",
    localDetails: "When arranging catering for a Rewa event, confirm the venue schedule and how food service should work for your guests. Pandey Catering discusses wedding and party menus, vegetarian food and serving arrangements with hosts before finalising an event plan.",
    faq: [
      ["Can I enquire about wedding catering in Rewa?", "Yes. Send the wedding date and approximate guest count so Pandey Catering can discuss the event and availability with you."],
      ["Do you cater parties and family events in Rewa?", "Party catering and catering for family gatherings are among the services you can enquire about."],
      ["How are travel and venue arrangements confirmed?", "Share your venue details when the team follows up. Travel and service arrangements are confirmed for each event individually."],
    ],
  },
  sidhi: {
    name: "Sidhi",
    region: "Madhya Pradesh",
    heading: "Catering Service in Sidhi",
    title: "Catering Service in Sidhi, Madhya Pradesh",
    description: "Pandey Catering takes enquiries for wedding, party, vegetarian and family function catering in Sidhi. Discuss your event date, guest count and food requirements to plan the next steps with the team.",
    metaDescription: "Arrange wedding, event or vegetarian catering in Sidhi with Pandey Catering. Share your date and guest estimate to discuss menu and service planning.",
    localDetails: "For catering in Sidhi, begin with the event date, venue and likely guest count. The team can then discuss meal timing, menu preferences and the kind of serving arrangements needed for your gathering. Event details are confirmed directly before a booking is finalised.",
    faq: [
      ["Does Pandey Catering serve events in Sidhi?", "Sidhi is listed as a service area. Contact the team to discuss your venue, event date and availability."],
      ["Can I ask about catering for a family function?", "Yes. Share the type of function and any customary food requirements when you enquire."],
      ["Can the menu include vegetarian food?", "Vegetarian food choices can be discussed for your event. Let the team know your preferences."],
    ],
  },
  nagpur: {
    name: "Nagpur",
    region: "Maharashtra",
    heading: "Catering Service in Nagpur",
    title: "Catering Service in Nagpur, Maharashtra",
    description: "Pandey Catering helps event hosts in Nagpur plan food service for weddings, parties and family gatherings. Share your event date, guest estimate and menu preferences to discuss the arrangements with our team.",
    metaDescription: "Looking for catering in Nagpur? Contact Pandey Catering to discuss wedding, party, vegetarian and family function menus, guest numbers and event arrangements.",
    localDetails: "For a Nagpur event, start with the date, venue schedule and expected number of guests. Pandey Catering can discuss menu preferences, vegetarian choices and meal service timing to suit your gathering. The team confirms availability and event arrangements directly with you.",
    faq: [
      ["Does Pandey Catering take catering enquiries for Nagpur?", "Nagpur is listed as a service area. Share your event date and venue details to confirm availability and arrangements."],
      ["Can I discuss a vegetarian menu for my Nagpur event?", "Yes. Tell the team about your food preferences and guest requirements when you enquire."],
      ["What information should I share first?", "Send your name, event date and expected guest count. The team will connect with you to discuss the venue and menu."],
    ],
  },
};

export function getLocationMetadata(slug) {
  const location = cateringLocations[slug];
  const canonical = `/catering-${slug}`;
  const url = `https://www.pandeycatering.in${canonical}`;
  return {
    title: location.title,
    description: location.metaDescription,
    alternates: { canonical },
    openGraph: { type: "website", locale: "en_IN", url, siteName: "Pandey Catering", title: `${location.title} | Pandey Catering`, description: location.metaDescription, images: [{ url: "https://www.pandeycatering.in/images/pandey-catering-social-preview.webp", width: 1200, height: 630, alt: "Catering buffet prepared for an event by Pandey Catering" }] },
    twitter: { card: "summary_large_image", title: `${location.title} | Pandey Catering`, description: location.metaDescription, images: ["https://www.pandeycatering.in/images/pandey-catering-social-preview.webp"] },
  };
}
