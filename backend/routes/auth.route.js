import express from "express";
import {
  signup,
  login,
  logout,
  addlikedProperty,
  getAllLikedProperty,
  getAllUsers,
  getAgentProperties,
} from "../controllers/auth.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../controllers/auth.controller.js"; // Import role-based authorization

const router = express.Router();

/* 🔑 Authentication Routes */
router.post("/signup", signup); // User registration (role-based)
router.post("/login", login); // User login (role-based)
router.post("/logout", logout); // User logout

/* ❤️ Liked Properties Routes */
router.get("/properties/liked", authCheck, getAllLikedProperty); // Get all liked properties
router.post("/properties/like", authCheck, addlikedProperty); // Add a property to liked list

/* 🔒 Admin Routes (Requires Admin Role) */
router.get("/admin/users", authCheck, authorizeRoles(["admin"]), getAllUsers); // Admin can get all users

/* 🔒 Agent Routes (Requires Agent Role) */
router.get(
  "/agent/properties",
  authCheck,
  authorizeRoles(["agent"]),
  getAgentProperties
); // Agent can get all their properties

export default router;
