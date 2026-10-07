import Image from "next/image";

const cateringImages = [
  { src: "/images/pandey-catering-event-buffet.webp", alt: "Buffet catering prepared for an event" },
  { src: "/images/pandey-catering-wedding-celebration.webp", alt: "Wedding celebration venue set for guests" },
  { src: "/images/pandey-catering-dessert-counter.webp", alt: "Dessert counter arranged for a catered event" },
];

function ImageSet({ copy = false }) {
  return (
    <div className="catering-carousel__set" aria-hidden={copy || undefined}>
      {cateringImages.map((image) => (
        <div className="catering-carousel__item" key={image.src}>
          <Image
            src={image.src}
            alt={copy ? "" : image.alt}
            fill
            sizes="(max-width: 640px) 82vw, (max-width: 1280px) 40vw, 400px"
            loading="lazy"
            className="object-cover"
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
