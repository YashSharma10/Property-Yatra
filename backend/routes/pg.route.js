import express from "express";
import {
  addPG,
  getPGById,
  getUserProfileAndPGs,
  latestPGs,
  listPGs,
} from "../controllers/pg.controller.js";
import upload from "../utils/upload.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", upload.array("images", 5), addPG);
router.get("/latest", latestPGs);
router.get("/list", listPGs);
router.get("/:id", getPGById);
router.get("/profile", authCheck, getUserProfileAndPGs);

export default router;
