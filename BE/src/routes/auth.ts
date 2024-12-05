import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { createUser, userLogin } from "../controllers/userController";

const router = express.Router();

// Register
router.post("/register",createUser);

// Login
router.post("/login", userLogin);

export default router;
