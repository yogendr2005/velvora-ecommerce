import razorpay from "../utils/razorpay.js";
import crypto from "crypto";
import { createOrder } from "./orderController.js";

export const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid payment amount"
      });
    }

    const options = {
      amount: Math.round(amount * 100),
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