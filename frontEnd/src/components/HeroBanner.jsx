import heroBanner from "../assets/images/hero-banner.jpg";
const HeroBanner = () => {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-subtitle">
          NEW COLLECTION 2026
        </span>

        <h1>
          Experience Premium Shopping
        </h1>

        <p>
          Discover high-quality products carefully selected for style,
          performance, and everyday life.
        </p>

        <button className="hero-btn">
          Shop Collection
        </button>

      </div>

      <div className="hero-image">

        <img
        src={heroBanner}
        alt="Hero Product"
        />

      </div>

    </section>
  );
};

export default HeroBanner;