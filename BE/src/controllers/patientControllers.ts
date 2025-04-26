import { Request, Response } from 'express';
import Patient, { IPatient } from '../models/Patients';

export const getPatients = async (req: Request, res: Response): Promise<void> => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const addPatient = async (req: Request, res: Response): Promise<void> => {
    const { name, age, gender, address }: IPatient = req.body;

    try {
        const newPatient = new Patient({ name, age, gender, address });
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getPatientById = async (req: Request, res: Response): Promise<void> => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            res.status(404).json({ message: 'Patient not found' });
            return;
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deletePatient = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await Patient.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(404).json({ message: 'Patient not found' });
            return;
        }
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
