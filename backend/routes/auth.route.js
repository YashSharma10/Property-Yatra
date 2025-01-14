import express from "express";
import {
  addlikedProperty,
  
  getAllPostedProperties,
  getPropertyByIdWithPostedData,
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
router.get("/property/analytics/:id", authCheck, getPropertyByIdWithPostedData);
// Just for checking auth in frontend
router.get("/auth/check", authCheck, (req, res) => {
  res.json(req.userDetails);
});

export default router;
