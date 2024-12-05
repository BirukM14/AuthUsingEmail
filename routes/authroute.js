import express from "express";
import { signup, verifyEmail, logout, login,forgotpassword } from "../controller/authcontroller.js";


const router = express.Router();


router.post("/signup",signup);
router.patch("/verifyemail",verifyEmail);
router.post("/logout",logout);
router.post("/login",login);
router.post("/forgotpass",forgotpassword);

export default router;