import razorpay from "../utils/razorpay.js";
import crypto from "crypto";
import { createOrder } from "./orderController.js";
import Cart from "../models/Cart.js";

export const createPaymentOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    const totalPrice = cart.items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    );

    if (totalPrice <= 0) {
      return res.status(400).json({
        message: "Invalid payment amount"
      });
    }

    const options = {
      amount: Math.round(totalPrice * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      message: "Payment order created successfully",
      order
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create payment order",
      error: error.message
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed"
      });
    }

    const razorpayOrder = await razorpay.orders.fetch(
      razorpay_order_id
    );

    if (!razorpayOrder) {
      return res.status(400).json({
        message: "Razorpay order not found"
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    const totalPrice = cart.items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    );

    const expectedAmount = Math.round(totalPrice * 100);

    if (razorpayOrder.amount !== expectedAmount) {
      return res.status(400).json({
        message: "Payment amount does not match order amount"
      });
    }

    req.body = {
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id
    };

    return createOrder(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};