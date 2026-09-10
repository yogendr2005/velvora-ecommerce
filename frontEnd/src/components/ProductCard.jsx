import { useDispatch, useSelector } from "react-redux";

import {
  FaHeart,
  FaRegHeart
} from "react-icons/fa";

import { toast } from "react-toastify";
import { addToCart } from "../store/slices/cartSlice";
import { toggleWishlist } from "../store/slices/wishlistSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.wishlist.wishlist
  );

  const formattedProduct = {
    ...product,
    id: product._id,
    price: `₹${Number(
      product.price
    ).toLocaleString("en-IN")}`
  };

  const isWishlisted = wishlist.some(
    (item) => item.id === formattedProduct.id
  );

  // ADD TO CART

  const handleAddToCart = async () => {
    try {
      await dispatch(
        addToCart({
          productId: product._id,
          quantity: 1
        })
      ).unwrap();

      toast.success(
        `${product.name} added to cart`
      );
    } catch (error) {
      toast.error(error);
    }
  };

  // WISHLIST

  const handleWishlist = async () => {
    try {
      await dispatch(
        toggleWishlist(formattedProduct)
      ).unwrap();

      if (isWishlisted) {
        toast.info(
          `${product.name} removed from wishlist`
        );
      } else {
        toast.success(
          `${product.name} added to wishlist`
        );
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // PRODUCT CLICK

  const handleProductClick = () => {
    navigate(
      `/product/${product._id}`
    );
  };

  return (
    <div className="product-card">

      <button
        className="wishlist-btn"
        onClick={handleWishlist}
      >
        {isWishlisted ? (
          <FaHeart />
        ) : (
          <FaRegHeart />
        )}
      </button>

      <div
        className="product-clickable"
        onClick={handleProductClick}
      >
        <img
          src={product.image}
          alt={product.name}
        />

        <div className="product-info">
          <h3>{product.name}</h3>

          <p>
            {formattedProduct.price}
          </p>
        </div>
      </div>

      <button
        className="add-cart-btn"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>

    </div>
  );
};

export default ProductCard;