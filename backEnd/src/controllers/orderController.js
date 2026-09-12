import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Place order
export const createOrder = async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod,
      razorpayOrderId,
      razorpayPaymentId
    } = req.body;

    // Find user's cart
    const cart = await Cart.findOne({
      user: req.user._id
    }).populate("items.product");

    // Check cart exists and has items
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    // Check stock
    for (const item of cart.items) {
      if (item.quantity > item.product.stock) {
        return res.status(400).json({
          message: `${item.product.name} does not have enough stock`
        });
      }
    }

    // Create order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    // Calculate total price
    const totalPrice = orderItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

    // Reduce product stock
    for (const item of cart.items) {
      item.product.stock -= item.quantity;
      await item.product.save();
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
      razorpayOrderId,
      razorpayPaymentId,
      totalPrice
    });

    // Clear cart after successful order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

// Get logged-in user's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id
    })
      .populate("orderItems.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

// Get all orders - Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate("orderItems.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

// Update order status - Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled"
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        message: "Invalid order status"
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    await order.populate("user", "name email");
    await order.populate("orderItems.product");

    res.status(200).json({
      message: "Order status updated successfully",
      order
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};