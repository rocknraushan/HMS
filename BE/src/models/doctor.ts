import mongoose, { Schema, Document } from 'mongoose';
import { ILocation } from './User';

export interface IDoctor extends Document {
  user: mongoose.Types.ObjectId; // Refers to the User with role: 'doctor'
  specialization: string;
  workingHours: string;
  clinicAddress?: string | ILocation;
  isAvailable: boolean;
  bio?: string;
  experience?: string;
  licenseNumber?: string; // Medical license number
  education?: string; // Medical education details
  verified?: boolean; // Whether the doctor is verified by the platform
  rating?: number; // Rating out of 5
}

const doctorSchema: Schema<IDoctor> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    specialization: { type: String, required: false },
    workingHours: { type: String, required: false },
    clinicAddress: { type: String },
    isAvailable: { type: Boolean, default: true },
    bio: { type: String },
    experience: { type: String },
    licenseNumber: { type: String },
    education: { type: String },
    verified: { type: Boolean, default: false },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

// Index for geo-based queries (e.g. nearest doctor)
doctorSchema.index({ location: '2dsphere' });

export default mongoose.model<IDoctor>('Doctor', doctorSchema);
