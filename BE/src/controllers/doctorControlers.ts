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

export const addDoctor = async (req: Request, res: Response): Promise<void> => {
    const { name, specialization, contact, email, workingHours }: IDoctor = req.body;

    try {
        const newDoctor = new Doctor({ name, specialization, contact, email, workingHours });
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
