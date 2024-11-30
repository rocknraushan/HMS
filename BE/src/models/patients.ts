import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
    name: string;
    age: number;
    gender: string;
    contact: string;
    address: string;
}

const patientSchema: Schema<IPatient> = new Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        contact: { type: String, required: true },
        address: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IPatient>('Patient', patientSchema);
