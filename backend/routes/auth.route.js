import express from "express";
import {
  addlikedProperty,
  getAllPostedProperties,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/liked/:id", authCheck, addlikedProperty);
router.get("/auth/profile", authCheck, getAllPostedProperties);

// Just for checking auth in frontend
router.get("/auth/check", authCheck, (req, res) => {
  res.json({ message: "Allowed" });
});

export default router;
