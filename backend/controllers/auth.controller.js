import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import mongoose from "mongoose";

// ✅ SIGNUP
export const signup = async (req, res) => {
  const { name, email, password, number, role } = req.body;
  if (!name || !email || !password || !number || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = new User({ name, email, password, number, role });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const newUser = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res
      .status(201)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        message: "User created successfully",
        newUser,
      });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const newUser = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        message: "Login successful",
        newUser,
      });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ LOGOUT
export const logout = (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfully" });
};

// ✅ ADD LIKED PROPERTY
export const addlikedProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const likedPropertiesData = await User.findByIdAndUpdate(
      req.user,
      {
        $push: { likedProperties: id },
      },
      { new: true }
    );
    console.log("ID", id);

    return res.status(200).json({ likedPropertiesData });
  } catch (error) {
    console.error("Add Liked Property Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL POSTED PROPERTIES
export const getAllPostedProperties = async (req, res) => {
  try {
    const user = await User.findById(req.user)
      .select("-password")
      .populate([{ path: "postedProperties" }, { path: "likedProperties" }]);

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get Posted Properties Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL LIKED PROPERTIES
export const getAllLikedProperty = async (req, res) => {
  try {
    const likedPropertyData = await User.findById(req.user)
      .populate("likedProperties")
      .select("-password -name -email -postedProperties -_id");

    return res
      .status(200)
      .json({ message: "Liked properties", likedPropertyData });
  } catch (error) {
    console.error("Get Liked Properties Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getPropertyByIdWithPostedData = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;
    console.log("PropertyId", id);

    const property = await User.findOne({
      _id: userId, // Match the user's ID
      // "postedProperties._id": { $in: [id] },
    })

      .populate({ path: "postedProperties", populate: { path: "views" } })
      .select("postedProperties");

    console.log("Properties Data", property);

    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
