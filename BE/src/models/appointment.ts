import mongoose, { Schema, Document } from 'mongoose';
import { IDoctor } from './doctor';
import { IPatient } from './Patients';

export interface IMedication {
  name: string;
  dosage: string;
  frequency: "once" | "twice" | "thrice" | "daily" | "weekly";
  route: "oral" | "intravenous" | "topical" | "inhalation" | "subcutaneous";
  duration: string;
}

export interface IPrescription {
  medication?: IMedication[];
  instructions: string;
  labTests?: string[];
  followUpInstructions?: string;
  doctorNotes?: string;
  nextFollowUpDate?: Date;
}

export interface IAppointment extends Document {
  patient: mongoose.Types.ObjectId | IPatient;
  doctor: mongoose.Types.ObjectId | IDoctor;
  nurse?: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  reason: string;
  followUp?: boolean;
  followUpDate?: Date;
  appointmentType: 'home' | 'clinical';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  prescription?: IPrescription;
  appountmentDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const medicationSchema = new Schema<IMedication>({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { 
    type: String, 
    enum: ["once", "twice", "thrice", "daily", "weekly"],
    required: true 
  },
  route: { 
    type: String, 
    enum: ["oral", "intravenous", "topical", "inhalation", "subcutaneous"],
    required: true 
  },
  duration: { type: String, required: true },
}, { _id: false });

const prescriptionSchema = new Schema<IPrescription>({
  medication: [medicationSchema],
  instructions: { type: String, required: true },
  labTests: [{ type: String }],
  followUpInstructions: { type: String },
  doctorNotes: { type: String },
  nextFollowUpDate: { type: Date },
}, { _id: false });

const appointmentSchema: Schema<IAppointment> = new Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },
    nurse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nurse'
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    reason: { type: String, required: true },
    prescription: prescriptionSchema,
    followUp: { type: Boolean, default: false },
    followUpDate: { type: Date, default: null },
    appointmentType: {
      type: String,
      enum: ['home', 'clinical'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending'
    },
    appountmentDate: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model<IAppointment>('Appointment', appointmentSchema);
