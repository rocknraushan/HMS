import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { createUser, forgetPassword, getProfile, updateLocation, updateProfile, uploadProfilePic, userLogin, verifyOtpAndResetPassword } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { uploadMultipleImg, uploadSingleProfilePic } from "../middleware/uploadMiddleware";

const router = express.Router();

// Register
router.post("/register", createUser);

// Login
router.post("/login", userLogin);
router.post("/forget-password", forgetPassword);
router.put("/profile/update",authMiddleware,uploadMultipleImg,updateProfile);
router.get("/profile", authMiddleware, getProfile);
router.post("/verify-otp",verifyOtpAndResetPassword);
router.put("/profile-pic", authMiddleware, uploadSingleProfilePic,uploadProfilePic);
router.put("/update-location", authMiddleware, updateLocation);

export default router;
