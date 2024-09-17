import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  me,
} from "../controller/auth.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);

router.post("/login", login);
router.post("/logout", logout);
router.get('/me',isAuthenticated,me)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
