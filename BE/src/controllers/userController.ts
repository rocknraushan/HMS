import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export async function createUser(req: Request, res: Response): Promise<any>  {
    const { name, email, password, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      const allowedRoles = ["doctor", "nurse", "admin", "patient"];
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
  
      const user = await User.create({ name, email, password, role });
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "", {
        expiresIn: "1h",
      });
  
      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }

export async function userLogin (req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await user.matchPassword(password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "", {
        expiresIn: "1h",
      });
  
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }