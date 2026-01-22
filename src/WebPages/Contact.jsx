export default function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto p-10">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>

      <form className="grid grid-cols-1 gap-4">
        <input className="border p-3 rounded" type="text" placeholder="Name" />
        <input className="border p-3 rounded" type="text" placeholder="Phone" />
        <textarea className="border p-3 rounded" placeholder="Message" rows="4"></textarea>
        <button className="bg-yellow-500 text-white p-3 rounded font-semibold">
          Submit
        </button>
      </form>
    </section>
  );
}
