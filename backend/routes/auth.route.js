import express from "express";
import {
  addlikedProperty,
  getAllLikedProperty,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/all-liked-properties", authCheck, getAllLikedProperty);
router.post("/liked-property", authCheck, addlikedProperty);

export default router;
