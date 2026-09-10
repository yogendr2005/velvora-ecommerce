import { useSelector } from "react-redux";

import ProductCard from "./ProductCard";

const ProductGrid = ({ title, type }) => {
  const products = useSelector(
    (state) => state.products.products
  );

  const filteredProducts = products.filter(
    (product) => product.type === type
  );

  return (
    <section className="product-section">
      <div className="section-header">
        <h2>{title}</h2>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;