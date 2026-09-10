import Product from "../models/Product.js";

// Create product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      price,
      image,
      category,
      type,
      rating,
      reviews,
      stock,
      description
    } = req.body;

    const product = await Product.create({
      name,
      brand,
      price,
      image,
      category,
      type,
      rating,
      reviews,
      stock,
      description
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const { category, type, search, sort } = req.query;

    const query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Search by product name
    if (search) {
      query.name = {
        $regex: search,
        $options: "i"
      };
    }

    let productsQuery = Product.find(query);

    // Sorting
    if (sort === "price-low") {
      productsQuery = productsQuery.sort({ price: 1 });
    } else if (sort === "price-high") {
      productsQuery = productsQuery.sort({ price: -1 });
    } else if (sort === "rating") {
      productsQuery = productsQuery.sort({ rating: -1 });
    } else if (sort === "newest") {
      productsQuery = productsQuery.sort({ createdAt: -1 });
    }

    const products = await productsQuery;

    res.status(200).json({
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      product
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};