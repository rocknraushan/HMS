import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";  // Import IUser interface
import { AuthRequest } from "../types";

// Define the JwtPayload interface (the decoded JWT)
interface JwtPayload {
  id: string;
  role: "doctor" | "nurse" | "admin" | "patient";  // Use the same role types as IUser
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }

  try {
    // Decode the token (only fetch id and role from it)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
    req.user = {
      _id: decoded.id,
      role: decoded.role,  // Use the role from the JWT
      matchPassword: async () => true,  // Example stub, implement this function correctly
    } ;  // Type-cast as IUser

    next();
  } catch (err) {
    res.status(401).json({ message: "Token expired or invalid" });
  }
};

export const roleMiddleware =
  (...allowedRoles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    // Ensure req.user exists and role is available
    if (!allowedRoles.includes(req?.user?.role ?? '')) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  };
