import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
    name: string;
    specialization: string;
    contact: string;
    email: string;
    workingHours: string;
}

const doctorSchema: Schema<IDoctor> = new Schema(
    {
        name: { type: String, required: true },
        specialization: { type: String, required: true },
        contact: { type: String, required: true },
        email: { type: String, required: true },
        workingHours: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IDoctor>('Doctor', doctorSchema);
