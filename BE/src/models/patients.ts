import mongoose, { Schema, Document } from 'mongoose';

export interface IMedicalHistory {
  condition: string;
  diagnosisDate: Date;
  notes?: string;
}

export interface IPrescription {
  prescribedBy: mongoose.Types.ObjectId | string; // Refers to User with role: 'doctor' or 'nurse'
  date: Date;
  medications: string;
  notes?: string;
}

export interface IDocument {
  title: string;
  url: string;
  uploadedAt: Date;
}

export interface IPatient extends Document {
  name: string;
  age: number;
  gender: string;
  address: string;
  allergies?: string[];
  medicalConditions?: string[];
  height?: number; // in cm
  weight?: number; // in kg
  medicalHistory?: IMedicalHistory[];
  prescriptions?: IPrescription[];
  documents?: IDocument[];
}

const medicalHistorySchema: Schema = new Schema({
  condition: { type: String, required: true },
  diagnosisDate: { type: Date, required: true },
  notes: { type: String },
});

const prescriptionSchema: Schema = new Schema({
  prescribedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  medications: { type: String, required: true },
  notes: { type: String },
});

const documentSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const patientSchema: Schema<IPatient> = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    medicalHistory: [medicalHistorySchema],
    prescriptions: [prescriptionSchema],
    documents: [documentSchema],
    allergies: { type: [String] },
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
  },
  { timestamps: true }
);

export default mongoose.model<IPatient>('Patient', patientSchema);
