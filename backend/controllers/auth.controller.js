import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { name, email, password, number } = req.body;
  if (!name || !email || !password || !number) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = new User({ name, email, password, number });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const newUser = {
      name: user.name,
      email: user.email,
    };

    res
      .status(201)
      .cookie("token", token, {
        // maxage: 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "User created successfully",
        newUser,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

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
    };

    res
      .status(200)
      .cookie("token", token, {
        // maxage: 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Login successful",
        newUser,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const addlikedProperty = async (req, res) => {
  const { propertyType, propertyId } = req.body;
  try {
    const likedPropertiesData = await User.findByIdAndUpdate(
      req.user,
      {
        $push: {
          likedProperties: { propertyType, propertyId },
        },
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({ likedPropertiesData });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getAllPostedProperties = async (req, res) => {
  try {
    const user = await User.findById(req.user).populate({ path: "Property" });
    console.log(user);
    
    res.status(200).json({ user });
  } catch (error) {}
};
export const getAllLikedProperty = async (req, res) => {
  try {
    const likedPropertyData = await User.findById(req.user)
      .populate({
        path: "likedProperties",
      })
      .select("-password -name -email -postedProperties -_id");
    return res
      .status(200)
      .json({ message: "Liked properties", likedPropertyData });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const checkToken = async (req, res) => {
  return res.status({ message: "Loginh" });
};
