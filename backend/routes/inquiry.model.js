import express from "express";
import { addInquiry } from "../controllers/inquiry.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add/:id", authCheck, addInquiry);

export default router;
