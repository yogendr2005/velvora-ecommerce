import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/routerConstants";

const WishList = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  return (
    <div className="wishlist-page">

      <div className="section-header">
        <h2>My Wishlist</h2>

        <p>
          {wishlist.length} {wishlist.length === 1 ? "Product" : "Products"}
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">

          <FaHeart className="empty-wishlist-icon" />

          <h2>Your Wishlist is Empty</h2>

          <p>
            Save your favorite products and they'll appear here.
            Start exploring our premium collection.
          </p>

          <Link
            to={ROUTES.HOME}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </Link>

        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default WishList;