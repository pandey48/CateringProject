const cateringImages = [
  { src: "/images/event-catering.jpg", alt: "Catering prepared for a special event" },
  { src: "/images/event-celebration.jpg", alt: "A beautifully arranged celebration" },
  { src: "/images/event-desserts.jpg", alt: "Desserts served at an event" },
];

function ImageSet({ copy = false }) {
  return (
    <div className="catering-carousel__set" aria-hidden={copy || undefined}>
      {cateringImages.map((image) => (
        <div className="catering-carousel__item" key={image.src}>
          <img
            src={image.src}
            alt={copy ? "" : image.alt}
            loading="lazy"
            decoding="async"
          />
          <span className="catering-carousel__shade" />
        </div>
      ))}
    </div>
  );
}

export default function CateringCarousel() {
  return (
    <section className="catering-carousel" aria-labelledby="catering-carousel-title">
      <div className="catering-carousel__intro">
        <span className="catering-carousel__eyebrow">Made for gathering</span>
        <h2 id="catering-carousel-title">Catering for Every Occasion</h2>
        <p>Delicious food and professional catering services for your special events.</p>
      </div>

      <div className="catering-carousel__viewport">
        <div className="catering-carousel__track">
          <ImageSet />
          <ImageSet copy />
        </div>
      </div>

      <a className="catering-carousel__cta" href="#services">
        Explore Catering <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
