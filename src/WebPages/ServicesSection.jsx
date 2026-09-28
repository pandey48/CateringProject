export default function ServicesSection() {
  const columns = [
    {
      title: "Main Service",
      items: [
        "Cooking",
        "Lighting & Production",
        "Music & Entertainment",
        "Catering & Cuisines",
        "Decoration",
        "Gift & Giveaways",
        "Tents",
      ],
    },
    {
      title: "Extended Service",
      items: [
        "Mehendi",
        "Wedding Invitations",
        "Giveaways & Gifts",
        "Photography & Video",
        "Hospitality",
      ],
    },
    {
      title: "Wedding Service",
      items: [
        "Stage Design & Production",
        "Structures & Special Tents",
        "Wedding Budget Management",
        "Floral Design & Decor",
        "Event Design Production",
        "Entertainment for all Functions",
        "Sound & Lighting Design",
      ],
    },
  ];

  return (
    <section className="w-full bg-[#f5efe9] py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">Complete solutions</span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Tailored support for every event type
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 text-center">
          {columns.map((column) => (
            <div key={column.title} className="rounded-3xl border border-orange-100 bg-white p-6 shadow-md shadow-orange-100/50 sm:p-7">
              <h3 className="mb-6 text-xl font-semibold text-gray-900">{column.title}</h3>
              <ul className="space-y-3 text-left text-gray-700">
                {column.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-center">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
