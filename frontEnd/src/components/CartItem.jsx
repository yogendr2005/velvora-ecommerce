import { useDispatch } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} from "../store/slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const isMaxStock =
    item.quantity >= item.stock;

  return (
    <div className="cart-item">

      <div className="cart-item-image">
        <img
          src={item.image}
          alt={item.name}
        />
      </div>

      <div className="cart-item-details">

        <h3>{item.name}</h3>

        <p className="price">
          {item.price}
        </p>

        <div className="quantity-container">

          <button
            onClick={() =>
              dispatch(decreaseQuantity(item.id))
            }
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() =>
              dispatch(increaseQuantity(item.id))
            }
            disabled={isMaxStock}
          >
            +
          </button>

        </div>

        {isMaxStock && (
          <p className="stock-message">
            Maximum available stock reached
          </p>
        )}

        <button
          className="remove-btn"
          onClick={() =>
            dispatch(removeFromCart(item.id))
          }
        >
          Remove
        </button>

      </div>

      <div className="cart-total">
        ₹
        {(
          Number(
            item.price.replace(/[₹,]/g, "")
          ) * item.quantity
        ).toLocaleString("en-IN")}
      </div>

    </div>
  );
};

export default CartItem;