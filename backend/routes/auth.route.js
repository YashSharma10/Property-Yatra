import express from "express";
import {
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
router.get("/auth/check", authCheck, (req, res) => {
  res.json({ message: "Allowed" });
});
router.get("/auth/profile", authCheck, getAllPostedProperties);

// /* ❤️ Liked Properties Routes */
// router.get("/properties/liked", authCheck, getAllLikedProperty); // Get all liked properties
// router.post("/properties/like", authCheck, addlikedProperty); // Add a property to liked list

// /* 🔒 Admin Routes (Requires Admin Role) */
// router.get("/admin/users", authCheck, authorizeRoles(["admin"]), getAllUsers); // Admin can get all users

// /* 🔒 Agent Routes (Requires Agent Role) */
// router.get(
//   "/agent/properties",
//   authCheck,
//   authorizeRoles(["agent"]),
//   getAgentProperties
// ); // Agent can get all their properties

// /* 🔒 User Routes (Requires User Role) */
// router.get("/user/properties", authCheck, getUserPostedProperties); // User can get all their properties

export default router;
