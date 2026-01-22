export default function Menu() {
  const items = ["Paneer Tikka", "Biryani", "Chole Bhature", "Sweets", "South Indian"];

  return (
    <section id="menu" className="max-w-6xl mx-auto p-10">
      <h2 className="text-3xl font-bold mb-6">Our Menu</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((i) => (
          <div key={i} className="p-5 bg-white shadow rounded-lg text-center">
            <p className="font-semibold">{i}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
