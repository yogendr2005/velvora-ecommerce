import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";

dotenv.config();

const categories = [
  {
    name: "Electronics"
  },
  {
    name: "Shoes"
  },
  {
    name: "Watches"
  },
  {
    name: "Accessories"
  },
  {
    name: "Gaming"
  }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Category.deleteMany();

    await Category.insertMany(categories);

    console.log("Categories seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding categories:", error.message);
    process.exit(1);
  }
};

seedCategories();