import { Request, Response } from 'express';
import Appointment, { IAppointment } from '../models/appointment';
import Patients from '../models/Patients';
import { AuthRequest } from '../types';
import doctor from '../models/doctor';
import User from '../models/User';

// GET all Appointments
export const getPatientAppointments = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id; // Get the user ID from the auth middleware

        // Ensure the user is authenticated and is a patient (optional, but good practice)
        if (!userId || req.user?.role !== 'patient') {
             res.status(403).json({ message: 'Not authorized to access appointments or user not found.' });
             return; // Return to prevent further execution
        }

        const appointments = await Appointment.aggregate([
            // Match appointments belonging to the authenticated patient
            {
                $match: {
                    patient: userId // Filter by the logged-in patient's ID
                }
            },
            // Lookup the patient document
            {
                $lookup: {
                    from: Patients.collection.name, // The collection name for the Patient model
                    localField: 'patient', // Field from the input documents (Appointments)
                    foreignField: '_id', // Field from the documents of the "from" collection (Patients)
                    as: 'patientDetails' // Output array field name
                }
            },
            // $lookup returns an array, unwind it to get a single patient object
            {
                $unwind: {
                    path: '$patientDetails',
                    preserveNullAndEmptyArrays: true // Keep appointments even if patient is not found
                }
            },
            // Lookup the doctor document
            {
                $lookup: {
                    from: doctor.collection.name, // The collection name for the Doctor model
                    localField: 'doctor', // Field from the input documents (Appointments)
                    foreignField: '_id', // Field from the Doctor document
                    as: 'doctorDetails' // Output array field name
                }
            },
            // $lookup returns an array, unwind it for a single doctor object
            {
                $unwind: {
                    path: '$doctorDetails',
                    preserveNullAndEmptyArrays: true // Keep appointments even if doctor is not found
                }
            },
            // Lookup the user document associated with the doctor
            {
                $lookup: {
                    from: User.collection.name, // The collection name for the User model
                    localField: 'doctorDetails.user', // Field from the populated doctorDetails
                    foreignField: '_id', // Field from the User document
                    as: 'doctorDetails.userDetails' // Output array field name, nested within doctorDetails
                }
            },
            // Unwind the userDetails array within doctorDetails
            {
                $unwind: {
                    path: '$doctorDetails.userDetails',
                    preserveNullAndEmptyArrays: true // Keep doctor even if user is not found
                }
            },
            // Project the desired fields and reshape the output
            {
                $project: {
                    _id: 1, // Include the appointment ID
                    date: 1,
                    time: 1,
                    reason: 1,
                    appointmentType: 1,
                    status: 1,
                    // Include other appointment fields you need here
                    // prescription: 1, // Include the embedded prescription

                    patient: { // Reshape the patient data
                        _id: '$patientDetails._id',
                        name: '$patientDetails.name',
                        email: '$patientDetails.email'
                        // Include other patient fields if needed
                    },
                    doctor: { // Reshape the doctor data
                        _id: '$doctorDetails._id',
                        name: '$doctorDetails.name', // Assuming Doctor model has name or use user's name
                        specialization: '$doctorDetails.specialization',
                        // Include other doctor fields if needed
                        user: { // Reshape the user data within doctor
                            _id: '$doctorDetails.userDetails._id',
                            name: '$doctorDetails.userDetails.name', // Use user's name
                            profilePic: '$doctorDetails.userDetails.profilePic'
                            // Include other user fields if needed
                        }
                    }
                }
            }
        ]);

        // Send the fetched appointments in the response
        res.status(200).json(appointments);

    } catch (error) {
        console.error('Error fetching appointments:', error);
        // Send an error response
        res.status(500).json({ message: 'Server Error', error: (error as Error).message });
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
        if (!user?._id) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        const newAppointment = new Appointment({
            patient: user?._id,
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
