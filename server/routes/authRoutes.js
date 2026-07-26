import express from "express";
import { signup, login, getMe, updateMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateSignup, validateLogin } from "../middleware/validate.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);

export default router;
