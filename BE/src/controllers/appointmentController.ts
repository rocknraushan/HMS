import { Request, Response } from 'express';
import Appointment, { IAppointment } from '../models/appointment';

export const getAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointments = await Appointment.find().populate('patient').populate('doctor');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
    const { patient, doctor, date, time, reason }: IAppointment = req.body;

    try {
        const newAppointment = new Appointment({ patient, doctor, date, time, reason });
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
