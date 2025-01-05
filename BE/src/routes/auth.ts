import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { createUser, forgetPassword, userLogin } from "../controllers/userController";

const router = express.Router();

// Register
router.post("/register", createUser);

// Login
router.post("/login", userLogin);
router.post("/forget-password", forgetPassword);

export default router;
