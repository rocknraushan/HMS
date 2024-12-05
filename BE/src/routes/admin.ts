import express, { Request, Response } from "express";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Admin dashboard
router.get("/dashboard", authMiddleware, roleMiddleware("admin"), (req: Request, res: Response) => {
  res.json({ message: "Welcome to the admin dashboard" });
});

// Doctor portal
router.get("/doctor-portal", authMiddleware, roleMiddleware("doctor"), (req: Request, res: Response) => {
  res.json({ message: "Welcome to the doctor portal" });
});

export default router;
