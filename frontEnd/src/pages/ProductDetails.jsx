import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { toggleWishlist } from "../store/slices/wishlistSlice";
import { toast } from "react-toastify";
import { getProductById } from "../services/productService";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const wishlist = useSelector(
    (state) => state.wishlist.wishlist
  );

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const cartLoading = useSelector(
    (state) => state.cart.loading
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProductById(id);

        setProduct(data.product);

        const cartItem = cartItems.find(
          (item) => item.id === id
        );

        if (cartItem) {
          setQuantity(cartItem.quantity);
        } else {
          setQuantity(1);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formattedProduct = product
    ? {
      ...product,
      id: product._id,
      price: `₹${Number(product.price).toLocaleString("en-IN")}`
    }
    : null;

  const isWishlisted = formattedProduct
    ? wishlist.some(
      (item) => item.id === formattedProduct.id
    )
    : false;

  const handleAddToCart = async () => {
    try {
      await dispatch(
        addToCart({
          productId: product._id,
          quantity
        })
      ).unwrap();

      toast.success(
        `${product.name} added to cart`
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(formattedProduct));

    if (isWishlisted) {
      toast.info(
        `${product.name} removed from wishlist`
      );
    } else {
      toast.success(
        `${product.name} added to wishlist`
      );
    }
  };

  if (loading) {
    return (
      <div className="product-not-found">
        <h2>Loading Product...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        {error && <p>{error}</p>}
      </div>
    );
  }

  return (
    <section className="product-details">
      <div className="product-left">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-right">
        <h1>{product.name}</h1>

        <div className="rating">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />

          <span>
            ({product.rating})
          </span>
        </div>

        <h2>{formattedProduct.price}</h2>

        <p className="description">
          {product.description}
        </p>

        <p className="category">
          <strong>Category:</strong>{" "}
          {product.category}
        </p>

        <div className="quantity">
          <button
            onClick={() =>
              quantity > 1 &&
              setQuantity(quantity - 1)
            }
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              setQuantity(quantity + 1)
            }
            disabled={quantity >= product.stock}
          >
            +
          </button>
        </div>

        <button
          className="buy-btn"
          onClick={handleAddToCart}
          disabled={cartLoading}
        >
          {cartLoading ? "Adding..." : "Add To Cart"}
        </button>

        <button
          className="wish-btn"
          onClick={handleWishlist}
        >
          <FaHeart />

          {isWishlisted
            ? "Remove from Wishlist"
            : "Add to Wishlist"}
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;