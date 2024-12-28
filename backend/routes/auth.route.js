import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Protected route to get current user details
router.get("/me", authCheck, (req, res) => {
  res.status(200).json({
    message: "User details fetched successfully",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

export default router;
