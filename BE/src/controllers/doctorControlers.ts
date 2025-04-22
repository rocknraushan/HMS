import { Request, Response } from 'express';
import Doctor, { IDoctor } from '../models/doctor';

export const getDoctors = async (req: Request, res: Response): Promise<void> => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

