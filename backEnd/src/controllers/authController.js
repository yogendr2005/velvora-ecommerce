import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import logActivity from "../utils/logActivity.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate JWT token
    const token = generateToken(user._id);

    logActivity(req, {
      action: "register",
      user: user._id,
      email: user.email
    });

    // Send response
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

export const getCurrentUser = async (req, res) => {
  res.status(200).json({
    user: req.user
  });
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      logActivity(req, { action: "login_failed", email });

      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Compare password
    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatched) {
      logActivity(req, {
        action: "login_failed",
        user: user._id,
        email: user.email
      });

      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    logActivity(req, {
      action: "login",
      user: user._id,
      email: user.email
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};