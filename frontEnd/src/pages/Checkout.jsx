import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { clearCart } from "../store/slices/cartSlice";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Loader from "../components/Loader";

import { createOrder } from "../services/orderService";

import {
  createPaymentOrder,
  verifyPayment
} from "../services/paymentService";

import { ROUTES } from "../routes/routerConstants";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(
    (state) => state.auth.token
  );

  const {
    cartItems,
    totalItems,
    totalPrice
  } = useSelector(
    (state) => state.cart
  );

  const [shippingAddress, setShippingAddress] =
    useState({
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      phone: ""
    });

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [loading, setLoading] =
    useState(false);


  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setShippingAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      navigate(ROUTES.CART);
      return;
    }

    if (
      !shippingAddress.fullName.trim() ||
      !shippingAddress.address.trim() ||
      !shippingAddress.city.trim() ||
      !shippingAddress.postalCode.trim() ||
      !shippingAddress.country.trim() ||
      !shippingAddress.phone.trim()
    ) {
      toast.error("Please fill in all shipping details");
      return;
    }

    const outOfStockItem = cartItems.find(
      (item) => item.quantity > item.stock
    );

    if (outOfStockItem) {
      toast.error(
        `${outOfStockItem.name} does not have enough stock`
      );
      return;
    }

    try {
      setLoading(true);

      // COD
      if (paymentMethod === "COD") {
        const data = await createOrder(
          { shippingAddress, paymentMethod },
          token
        );

        dispatch(clearCart());

        toast.success(
          data.message || "Order placed successfully"
        );

        navigate(ROUTES.PROFILE);
        return;
      }

      // CARD / UPI
      const data = await createPaymentOrder(
        totalPrice,
        token
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Velvora",
        description: "Velvora Order",
        order_id: data.order.id,

        handler: async function (response) {
          try {
            setLoading(true);

            const verificationData = await verifyPayment(
              {
                shippingAddress,
                paymentMethod,
                razorpay_order_id:
                  response.razorpay_order_id,
                razorpay_payment_id:
                  response.razorpay_payment_id,
                razorpay_signature:
                  response.razorpay_signature
              },
              token
            );

            dispatch(clearCart());

            toast.success(
              verificationData.message ||
              "Order placed successfully"
            );

            navigate(ROUTES.PROFILE);
          } catch (error) {
            toast.error(error.message);
          } finally {
            setLoading(false);
          }
        },

        prefill: {
          name: shippingAddress.fullName,
          contact: shippingAddress.phone
        },

        theme: {
          color: "#000000"
        }
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // LOADER
  // ===========================

  if (loading) {
    return <Loader />;
  }

  // ===========================
  // EMPTY CART
  // ===========================

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>

          <p>
            Add some products before
            proceeding to checkout.
          </p>

          <button
            className="continue-shopping-btn"
            onClick={() =>
              navigate(ROUTES.CART)
            }
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  // ===========================
  // RENDER
  // ===========================

  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* ===========================
            ORDER SUMMARY
        =========================== */}

        <div className="checkout-items">

          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="checkout-item"
            >
              <div>
                <h3>{item.name}</h3>

                <p>
                  Quantity: {item.quantity}
                </p>
              </div>

              <p>
                ₹
                {(
                  Number(
                    item.price.replace(
                      /[₹,]/g,
                      ""
                    )
                  ) * item.quantity
                ).toLocaleString("en-IN")}
              </p>
            </div>
          ))}

          <hr />

          <div className="checkout-total">

            <span>
              Items: {totalItems}
            </span>

            <strong>
              Total: ₹
              {totalPrice.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

        </div>

        {/* ===========================
            SHIPPING + PAYMENT
        =========================== */}

        <div className="checkout-form">

          <h2>Shipping Details</h2>

          {/* FULL NAME */}

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={
                shippingAddress.fullName
              }
              onChange={
                handleAddressChange
              }
              placeholder="Enter your full name"
            />

          </div>

          {/* ADDRESS */}

          <div className="form-group">

            <label>
              Address
            </label>

            <textarea
              name="address"
              value={
                shippingAddress.address
              }
              onChange={
                handleAddressChange
              }
              placeholder="Enter your address"
              rows="4"
            />

          </div>

          {/* CITY */}

          <div className="form-group">

            <label>
              City
            </label>

            <input
              type="text"
              name="city"
              value={
                shippingAddress.city
              }
              onChange={
                handleAddressChange
              }
              placeholder="Enter your city"
            />

          </div>

          {/* POSTAL CODE */}

          <div className="form-group">

            <label>
              Postal Code
            </label>

            <input
              type="text"
              name="postalCode"
              value={
                shippingAddress.postalCode
              }
              onChange={
                handleAddressChange
              }
              placeholder="Enter postal code"
            />

          </div>

          {/* COUNTRY */}

          <div className="form-group">

            <label>
              Country
            </label>

            <input
              type="text"
              name="country"
              value={
                shippingAddress.country
              }
              onChange={
                handleAddressChange
              }
              placeholder="Enter your country"
            />

          </div>

          {/* PHONE */}

          <div className="form-group">

            <label>
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={
                shippingAddress.phone
              }
              onChange={
                handleAddressChange
              }
              placeholder="Enter your phone number"
            />

          </div>

          {/* PAYMENT METHOD */}

          <div className="form-group">

            <label>
              Payment Method
            </label>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            >
              <option value="COD">
                Cash on Delivery
              </option>

              <option value="CARD">
                Card
              </option>

              <option value="UPI">
                UPI
              </option>
            </select>

          </div>

          {/* PLACE ORDER */}

          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default Checkout;