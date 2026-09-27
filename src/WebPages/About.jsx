export default function About() {
  const stats = [
    { value: "15+", label: "Years of service" },
    { value: "500+", label: "Events delivered" },
    { value: "4.9/5", label: "Client rating" },
  ];

  return (
    <section
      id="about"
      className="w-full overflow-hidden bg-gradient-to-b from-white via-orange-50 to-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
              About us
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Creating memorable moments with <span className="text-orange-500">care and creativity</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-700 sm:text-lg">
              We provide <span className="font-semibold text-yellow-600">complete event services</span> with thoughtful planning,
              trusted professionals, and flexible solutions for weddings, birthdays, corporate events, and every special occasion.
            </p>
          </div>

          <div className="rounded-[28px] border border-orange-100 bg-white p-5 shadow-lg shadow-orange-100/60 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-orange-50 px-4 py-5 text-center">
                  <div className="text-2xl font-black text-orange-500 sm:text-3xl">{stat.value}</div>
                  <div className="mt-2 text-sm font-medium text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
