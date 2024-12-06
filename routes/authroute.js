import express from "express";
import { signup, verifyEmail, logout, login,forgotpassword, resetpassword,checkAuth } from "../controller/authcontroller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth",verifyToken ,checkAuth);
router.post("/signup",signup);
router.patch("/verifyemail",verifyEmail);
router.post("/logout",logout);
router.post("/login",login);
router.post("/forgotpass",forgotpassword);
router.post("/reset-password/:token",resetpassword);
export default router;