import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Get user cart

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id
    }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        items: []
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

// Add product to cart

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Check product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    // Check requested quantity
    if (quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1"
      });
    }

    // Find user's cart
    let cart = await Cart.findOne({
      user: req.user._id
    });

    // Check if product already exists in cart
    const existingItem = cart?.items.find(
      (item) =>
        item.product.toString() === productId
    );

    const currentQuantity = existingItem
      ? existingItem.quantity
      : 0;

    const newQuantity = currentQuantity + quantity;

    // Check stock
    if (newQuantity > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} ${product.name} available in stock`
      });
    }

    // Create cart if it doesn't exist
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [
          {
            product: productId,
            quantity
          }
        ]
      });
    } else {
      if (existingItem) {
        // Product already exists → increase quantity
        existingItem.quantity = newQuantity;
      } else {
        // New product → add to cart
        cart.items.push({
          product: productId,
          quantity
        });
      }

      await cart.save();
    }

    const updatedCart = await Cart.findById(cart._id)
      .populate("items.product");

    res.status(200).json({
      message: "Product added to cart",
      cart: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

// Update cart item quantity

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const productId = req.params.id;

    if (quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1"
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    const item = cart.items.find(
      (item) =>
        item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart"
      });
    }

    // Get latest product stock
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    // Check stock
    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} ${product.name} available in stock`
      });
    }

    item.quantity = quantity;

    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
      .populate("items.product");

    res.status(200).json({
      message: "Cart updated successfully",
      cart: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

// Remove product from cart

export const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;

    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.product.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
      .populate("items.product");

    res.status(200).json({
      message: "Product removed from cart",
      cart: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};