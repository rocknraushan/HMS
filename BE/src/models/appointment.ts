import mongoose, { Schema, Document } from 'mongoose';
import { IDoctor } from './doctor';
import { IPatient } from './patients';

export interface IAppointment extends Document {
    patient: mongoose.Types.ObjectId | IPatient;
    doctor: mongoose.Types.ObjectId | IDoctor;
    date: Date;
    time: string;
    reason: string;
}

const appointmentSchema: Schema<IAppointment> = new Schema(
    {
        patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
        doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true },
        reason: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IAppointment>('Appointment', appointmentSchema);
