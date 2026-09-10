import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },

    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0
    },

    image: {
      type: String,
      required: [true, "Product image is required"]
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true
    },

    type: {
      type: String,
      default: "regular"
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    reviews: {
      type: Number,
      default: 0,
      min: 0
    },

    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: 0
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;