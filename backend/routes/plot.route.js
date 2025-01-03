import express from "express";
import {
  addPlot,
  getPlotById,
  getUserProfileAndPlots,
  latestPlots,
  listPlots,
} from "../controllers/plot.controller.js";
import upload from "../utils/upload.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", upload.array("images", 5), addPlot);
router.get("/latest", latestPlots);
router.get("/list", listPlots);
router.get("/:id", getPlotById);
router.get("/profile", authCheck, getUserProfileAndPlots);

export default router;
