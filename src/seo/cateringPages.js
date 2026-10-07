export const cateringPages = {
  "wedding-catering": {
    title: "Wedding Catering",
    heading: "Wedding Catering in Hanumana",
    description: "Wedding catering needs careful timing, a menu guests can enjoy, and a service team that can handle a full celebration. Pandey Catering works with families in Hanumana to plan food service around their wedding events and guest count.",
    metaDescription: "Plan wedding catering in Hanumana with Pandey Catering. Discuss vegetarian menus, guest numbers, service timing and food arrangements for your celebration.",
    menuHeading: "A wedding menu planned around your guests",
    menu: ["Discuss vegetarian and family-favourite dishes", "Plan meal service around ceremony timings", "Choose counters and serving arrangements for the venue", "Adjust the food plan to the expected guest count"],
    process: "Start with your wedding date, venue and estimated guest count. We can then discuss the food you have in mind and the service arrangements needed for your celebration. Final menu and availability are confirmed directly with our team.",
    faqs: [
      ["Can I discuss catering for multiple wedding functions?", "Yes. Share the event dates and the functions you are planning so the team can discuss arrangements for each occasion."],
      ["Can the wedding menu be customized?", "Menu choices can be discussed around your preferences, family traditions and guest requirements. Final options depend on availability and event details."],
      ["How do I request wedding catering?", "Send your name, event date and guest count through the enquiry form or call Pandey Catering to discuss your plans."],
    ],
  },
  "party-catering": {
    title: "Party Catering",
    heading: "Party Catering for Family Celebrations",
    description: "A birthday, anniversary or family get-together calls for food service that fits the occasion and the people attending. Pandey Catering helps Hanumana families discuss a suitable menu and serving plan for their party.",
    metaDescription: "Arrange party catering in Hanumana with Pandey Catering. Discuss food choices, vegetarian options, guest count and service for birthdays and family celebrations.",
    menuHeading: "Food service that fits your party",
    menu: ["Food choices suited to the type of celebration", "Vegetarian options for family and mixed-age gatherings", "Guest-count based serving arrangements", "A menu discussion shaped by your preferences"],
    process: "Tell us what you are celebrating, when it is happening and approximately how many guests you expect. Our team will discuss the menu and serving approach with you before confirming availability.",
    faqs: [
      ["Do you cater birthday parties and anniversaries?", "Pandey Catering can discuss catering for birthdays, anniversaries and family gatherings in Hanumana."],
      ["Can you help with vegetarian party food?", "Yes. Tell us your food preferences when you contact the team so vegetarian choices can be discussed."],
      ["How early should I ask about a party booking?", "Contact us as soon as you know your date and approximate guest count. Availability is confirmed by the team."],
    ],
  },
  "event-catering": {
    title: "Event Catering",
    heading: "Event Catering in Hanumana",
    description: "From community gatherings to organised celebrations, event catering depends on the venue, schedule and number of guests. Pandey Catering helps customers in Hanumana plan food service around the practical details of their event.",
    metaDescription: "Looking for event catering in Hanumana? Contact Pandey Catering to discuss guest numbers, menu preferences and serving arrangements for your event.",
    menuHeading: "Plan the food around the event",
    menu: ["Menu planning based on the event and guests", "Vegetarian food choices on request", "Serving plans matched to the venue and schedule", "Arrangements discussed for small and large gatherings"],
    process: "Share the event date, venue area and an estimate of the guest count. We will discuss the food requirements, serving plan and availability with you before confirming a booking.",
    faqs: [
      ["What events can you cater?", "Contact us about weddings, parties, religious and family functions, and other gatherings. We will discuss the event details and availability."],
      ["Can you cater for a large number of guests?", "Guest numbers are discussed during planning so the team can advise what arrangements may be possible for your date."],
      ["Do you provide catering outside Hanumana?", "Service availability depends on the event location and date. Please call to confirm whether your venue is within our current service area."],
    ],
  },
  "vegetarian-catering": {
    title: "Vegetarian Catering",
    heading: "Vegetarian Catering for Every Occasion",
    description: "Pandey Catering offers customers in Hanumana a chance to plan vegetarian food for weddings, parties and family occasions. Discuss the dishes, meal format and service timing that suit your guests.",
    metaDescription: "Discuss vegetarian catering in Hanumana with Pandey Catering. Plan food for weddings, parties and family events around your preferences and guest count.",
    menuHeading: "A vegetarian menu shaped by your preferences",
    menu: ["Discuss regional and family-favourite dishes", "Plan meals for weddings, parties and religious functions", "Consider guest needs and the event schedule", "Confirm menu options directly with the catering team"],
    process: "Tell us the occasion, event date and estimated guest count, then share any food preferences or family requirements. Menu options and availability are confirmed directly with our team.",
    faqs: [
      ["Do you provide fully vegetarian catering?", "Yes, vegetarian catering can be discussed for your event. Share your requirements when you contact us."],
      ["Can I request specific vegetarian dishes?", "Tell our team which dishes or regional preferences matter to your family, and we can discuss suitable menu options."],
      ["Do you cater vegetarian food for religious functions?", "Contact us with the function details and food requirements so we can discuss the menu and availability."],
    ],
  },
  "religious-function-catering": {
    title: "Religious & Family Function Catering",
    heading: "Catering for Religious & Family Functions",
    description: "Food for a religious or family function often follows traditions and preferences that are important to the hosts. Pandey Catering works with families in Hanumana to discuss suitable vegetarian menus and serving arrangements for these occasions.",
    metaDescription: "Plan catering for religious and family functions in Hanumana with Pandey Catering. Discuss vegetarian food, traditions, guest numbers and serving arrangements.",
    menuHeading: "Respectful planning for meaningful occasions",
    menu: ["Discuss vegetarian and family-preferred food", "Plan service around the function schedule", "Share dietary or customary requirements in advance", "Arrange food service for your expected guest count"],
    process: "When enquiring, let us know the kind of function, date, guest estimate and any food customs the team should consider. We will discuss possible menu and service arrangements with you.",
    faqs: [
      ["Do you cater religious functions and family ceremonies?", "Yes. Contact us with the function details, date and food requirements so we can discuss availability."],
      ["Can the menu follow our family traditions?", "Please share any customary dishes or serving requirements with the team. Menu options are confirmed after discussing your event."],
      ["Can you provide vegetarian food for a family function?", "Vegetarian food can be discussed for your occasion. Tell us your preferences when you enquire."],
    ],
  },
};

export function getCateringPageMetadata(slug) {
  const page = cateringPages[slug];
  const url = `https://www.pandeycatering.in/${slug}`;
  return {
    title: `${page.title} in Hanumana`,
    description: page.metaDescription,
    alternates: { canonical: `/${slug}` },
    openGraph: { type: "website", locale: "en_IN", url, siteName: "Pandey Catering", title: `${page.title} in Hanumana | Pandey Catering`, description: page.metaDescription, images: [{ url: "https://www.pandeycatering.in/images/pandey-catering-social-preview.webp", width: 1200, height: 630, alt: "Catering buffet prepared for an event by Pandey Catering" }] },
    twitter: { card: "summary_large_image", title: `${page.title} in Hanumana | Pandey Catering`, description: page.metaDescription, images: ["https://www.pandeycatering.in/images/pandey-catering-social-preview.webp"] },
  };
}
