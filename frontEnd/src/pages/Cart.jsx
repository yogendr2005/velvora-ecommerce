import { useSelector } from "react-redux";

import CartItem from "../components/CartItem";

import { FaShoppingBag } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import { ROUTES } from "../routes/routerConstants";

import Loader from "../components/Loader";

const Cart = () => {
  const {
    cartItems,
    totalItems,
    totalPrice,
    loading,
    error
  } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <FaShoppingBag className="empty-cart-icon" />

          <h2>Unable to Load Cart</h2>

          <p>{error}</p>

          <Link
            to={ROUTES.HOME}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <FaShoppingBag className="empty-cart-icon" />

          <h2>Your Cart is Empty</h2>

          <p>
            Looks like you haven't added anything yet.
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
        <>
          <div className="cart-header">
            <h1>Shopping Cart</h1>

            <p>
              {totalItems}{" "}
              {totalItems === 1
                ? "Item"
                : "Items"}
            </p>
          </div>

          <div className="cart-container">

            <div className="cart-items">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>

                <span>
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <hr />

              <div className="summary-row total">
                <span>Total</span>

                <span>
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <button className="checkout-btn" onClick={() =>
                navigate(ROUTES.CHECKOUT)
              }>
                Proceed to Checkout
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default Cart;