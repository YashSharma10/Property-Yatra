import express from "express";
import {
  addProperty,
  getPropertyById,
  getUserProfileAndProperties,
  latestProperties,
  listProperties,
} from "../controllers/property.controller.js";
import upload from "../utils/upload.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Add a new property with image upload
router.post("/add", upload.array("images", 5), addProperty);
router.get("/latest",latestProperties);
router.get("/list", listProperties);
router.get("/:id", getPropertyById);
router.get("/profile", authCheck, getUserProfileAndProperties);

export default router;
