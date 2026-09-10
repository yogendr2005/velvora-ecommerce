import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "MacBook Pro",
    brand: "Apple",
    price: 149999,
    image: "/images/products/macbook.jpg",
    category: "Electronics",
    type: "featured",
    rating: 4.9,
    reviews: 245,
    stock: 12,
    description:
      "Apple M4 Pro chip with Retina display and all-day battery."
  },
  {
    name: "iPhone 16 Pro",
    brand: "Apple",
    price: 119999,
    image: "/images/products/iphone.jpg",
    category: "Electronics",
    type: "featured",
    rating: 4.8,
    reviews: 310,
    stock: 20,
    description:
      "A18 Pro chip with an advanced camera system."
  },
  {
    name: "Sony WH-1000XM5",
    brand: "Sony",
    price: 29999,
    image: "/images/products/headphone.jpg",
    category: "Electronics",
    type: "featured",
    rating: 4.7,
    reviews: 180,
    stock: 15,
    description:
      "Industry-leading noise cancellation headphones."
  },
  {
    name: "Nike Air Max",
    brand: "Nike",
    price: 8999,
    image: "/images/products/shoes.jpg",
    category: "Shoes",
    type: "featured",
    rating: 4.6,
    reviews: 154,
    stock: 30,
    description:
      "Comfortable everyday sneakers with Air cushioning."
  },
  {
    name: "Samsung S25 Ultra",
    brand: "Samsung",
    price: 109999,
    image: "/images/products/samsung.jpg",
    category: "Electronics",
    type: "new-arrivals",
    rating: 4.8,
    reviews: 95,
    stock: 18,
    description:
      "Flagship Android smartphone with Galaxy AI features."
  },
  {
    name: "Apple Watch Series 10",
    brand: "Apple",
    price: 44999,
    image: "/images/products/watch.jpg",
    category: "Watches",
    type: "new-arrivals",
    rating: 4.7,
    reviews: 122,
    stock: 25,
    description:
      "Fitness tracking, health monitoring, and notifications."
  },
  {
    name: "Gaming Keyboard",
    brand: "Logitech",
    price: 4999,
    image: "/images/products/keyBoard.jpg",
    category: "Gaming",
    type: "new-arrivals",
    rating: 4.5,
    reviews: 78,
    stock: 40,
    description:
      "Mechanical RGB gaming keyboard."
  },
  {
    name: "Leather Backpack",
    brand: "Wildcraft",
    price: 3999,
    image: "/images/products/bag.jpg",
    category: "Accessories",
    type: "new-arrivals",
    rating: 4.4,
    reviews: 56,
    stock: 35,
    description:
      "Premium leather backpack for work and travel."
  },
  {
    name: "PlayStation 5",
    brand: "Sony",
    price: 54999,
    image: "/images/products/ps5.jpg",
    category: "Gaming",
    type: "best-sellers",
    rating: 4.9,
    reviews: 402,
    stock: 10,
    description:
      "Next-generation gaming console."
  },
  {
    name: "Canon EOS R50",
    brand: "Canon",
    price: 79999,
    image: "/images/products/camera.jpg",
    category: "Electronics",
    type: "best-sellers",
    rating: 4.8,
    reviews: 140,
    stock: 14,
    description:
      "Mirrorless camera with 4K video support."
  },
  {
    name: "AirPods Pro",
    brand: "Apple",
    price: 24999,
    image: "/images/products/airpods.jpg",
    category: "Electronics",
    type: "best-sellers",
    rating: 4.8,
    reviews: 330,
    stock: 28,
    description:
      "Wireless earbuds with Active Noise Cancellation."
  },
  {
    name: "iPad Air",
    brand: "Apple",
    price: 59999,
    image: "/images/products/ipad.jpg",
    category: "Electronics",
    type: "best-sellers",
    rating: 4.9,
    reviews: 188,
    stock: 17,
    description:
      "Lightweight tablet powered by Apple's M-series chip."
  }
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error.message);

    process.exit(1);
  }
};

seedProducts();