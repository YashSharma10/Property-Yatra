import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authCheck = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    req.user = user._id;
    // console.log(decoded);

    if (!req.user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
