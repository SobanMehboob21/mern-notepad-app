import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const CreateTheUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "User already exists, please login." });
    }

    const createUser = await User.create({ username, email, password });
    if (!createUser) {
      return res.status(400).json({ message: "User creation failed." });
    }

    const token = jwt.sign(
      {
        id: createUser._id,
        username: createUser.username,
        email: createUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

  
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: createUser._id,
        username: createUser.username,
        email: createUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error in CreateTheUser:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

export const LoginTheUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      {
        id: existUser._id,
        email: existUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, 
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: existUser._id,
        email: existUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error in LoginTheUser:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};
