import { Request } from 'express';
import { IUser } from '../models/User';  // Import your IUser interface from the user model

// Extend the Express Request type to include `user` property
export interface AuthRequest extends Request {
    user?:{
        _id: string;
        role: "doctor" | "nurse" | "admin" | "patient" | "emt";  // Use the same role types as IUser
        matchPassword: (enteredPassword: string) => Promise<boolean>;
    } & Partial<IUser>;  // user property is optional here
}
