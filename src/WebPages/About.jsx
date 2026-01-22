export default function About() {
  return (
    <section
      id="about"
      className="w-full bg-white py-10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-2">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-6 text-center
                       animate-fade-in">
          About Us
        </h2>

        {/* Description */}
        <p
          className="text-gray-700 text-lg leading-relaxed text-center
                     max-w-3xl mx-auto mb-12
                     animate-slide-up"
        >
          We provide <span className="font-semibold text-yellow-600">
          premium catering services</span> with delicious food,
          professional staff, and complete event management.
          Along with catering, we also offer end-to-end event solutions.
        </p>

        
      </div>
    </section>
  );
}
