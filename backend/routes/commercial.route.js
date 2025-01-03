import express from "express";
import {
  addCommercialProperty,
  getCommercialPropertyById,
  getUserProfileAndCommercialProperties,
  latestCommercialProperties,
  listCommercialProperties,
} from "../controllers/commercial.controller.js";
import upload from "../utils/upload.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", upload.array("images", 5), addCommercialProperty);
router.get("/latest", latestCommercialProperties);
router.get("/list", listCommercialProperties);
router.get("/:id", getCommercialPropertyById);
router.get("/profile", authCheck, getUserProfileAndCommercialProperties);

export default router;
