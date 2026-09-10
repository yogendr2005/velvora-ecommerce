import User from "../models/User.js";
import Product from "../models/Product.js";

// Get wishlist
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("wishlist");

    res.status(200).json({
      wishlist: user.wishlist
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};


// Add product to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const user = await User.findById(req.user._id);

    // Check if product already exists in wishlist
    const alreadyExists = user.wishlist.some(
      (item) => item.toString() === productId
    );

    if (alreadyExists) {
      return res.status(400).json({
        message: "Product already exists in wishlist"
      });
    }

    user.wishlist.push(productId);

    await user.save();

    const updatedUser = await User.findById(req.user._id)
      .populate("wishlist");

    res.status(200).json({
      message: "Product added to wishlist",
      wishlist: updatedUser.wishlist
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};


// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(
      (item) => item.toString() !== productId
    );

    await user.save();

    const updatedUser = await User.findById(req.user._id)
      .populate("wishlist");

    res.status(200).json({
      message: "Product removed from wishlist",
      wishlist: updatedUser.wishlist
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};