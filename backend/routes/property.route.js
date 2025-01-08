import express from "express";
import {
  addProperty,
  createProperty,
  getPropertyById,
  getUserProfileAndProperties,
  latestProperties,
  listProperties,
} from "../controllers/property.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { uploadFiles } from "../middlewares/multer.middleware.js";

const router = express.Router();


router.post("/new", uploadFiles,authCheck, createProperty);
router.get("/latest", latestProperties);
router.get("/list", listProperties);
router.get("/profile", authCheck, getUserProfileAndProperties);
router.get("/:id", getPropertyById);

export default router;
