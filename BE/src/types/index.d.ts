import { Request } from 'express';
import { IUser } from '../models/User';  // Import your IUser interface from the user model

// Extend the Express Request type to include `user` property
export interface CustomRequest extends Request {
    user?: IUser;  // user property is optional here
}
