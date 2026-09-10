import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import electronics from "../assets/images/electronics.jpg";
import fashion from "../assets/images/fashion.jpg";
import shoes from "../assets/images/shoes.jpg";
import watches from "../assets/images/watches.jpg";
import accessories from "../assets/images/accessories.jpg";
import gaming from "../assets/images/gaming.jpg";

const categoryImages = {
  Electronics: electronics,
  Fashion: fashion,
  Shoes: shoes,
  Watches: watches,
  Accessories: accessories,
  Gaming: gaming
};

const CategorySection = () => {
  const navigate = useNavigate();

  const {
    categories,
    loading,
    error
  } = useSelector(
    (state) => state.categories
  );

  const handleCategoryClick = (category) => {
    navigate(
      `/shop?category=${encodeURIComponent(category)}`
    );
  };

  if (loading) {
    return (
      <section className="category-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Loading categories...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="category-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="category-section">

      <div className="section-header">
        <h2>Shop by Category</h2>

        <p>
          Find your favorite products across our collections.
        </p>
      </div>

      <div className="category-grid">

        {categories.map((category) => (
          <div
            className="category-card"
            key={category._id}
            onClick={() =>
              handleCategoryClick(category.name)
            }
          >
            <img
              src={categoryImages[category.name]}
              alt={category.name}
            />

            <h3>{category.name}</h3>
          </div>
        ))}

      </div>

    </section>
  );
};

export default CategorySection;