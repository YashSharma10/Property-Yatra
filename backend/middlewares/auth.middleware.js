import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authCheck = async (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
