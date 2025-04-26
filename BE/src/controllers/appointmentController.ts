import { Request, Response } from 'express';
import Appointment, { IAppointment } from '../models/appointment';
import { AuthRequest } from 'index';
import Patients from '../models/Patients';

// GET all Appointments
export const getAppointments = async (req: Request, res: Response): Promise<any> => {
    try {
        const appointments = await Appointment.find()
            .populate('patient', 'name email') // only get specific fields if needed
            .populate('doctor', 'name specialization'); // optional, to optimize the query size

        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message });
    }
};

// POST Create Appointment
export const createAppointment = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { user } = req;

        if (user && user.role !== 'patient') {
            return res.status(403).json({ message: 'You are not allowd to book appointment' });
        }
        const { doctor, nurse, date, time, reason, appointmentType } = req.body;

        const appointmentExists = await Appointment.findOne({date,doctor,patient:user?._id});
        if(appointmentExists?.status ==="completed"){
            const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentExists._id, {status:"pending",followUp:true,updatedAt:new Date()}, { new: true });
            return res.status(200).json({message:"Follow up scheduled successfully",...updatedAppointment});
        }
        if (appointmentExists?.status && appointmentExists?.status !== 'cancelled') {
            return res.status(400).json({ message: 'Appointment already exists for this date and doctor' });
        }
        const discoveredPatient = await Patients.findOne({user: user?._id});
        if (!discoveredPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        const newAppointment = new Appointment({
            patient: discoveredPatient?._id,
            doctor,
            nurse,
            date,
            time,
            reason,
            appointmentType 
        });
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message });
    }
};
