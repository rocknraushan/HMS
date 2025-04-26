import mongoose, { Schema, Document } from 'mongoose';

export interface INurse extends Document {
  user: mongoose.Types.ObjectId; // Linked to User with role: 'nurse'
  specialization?: string;
  isAvailable: boolean;
  experience?: string;
  verified?: boolean;
  bio?: string;
  education?: string;
  licenseNumber?: string;
  rating?: number;
  homeVisit?: boolean; // Whether the nurse offers home visits
  clinicAddress?: string;
}

const nurseSchema: Schema<INurse> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    clinicAddress: { type: String, required: false },
    homeVisit: { type: Boolean, default: false },
    specialization: { type: String, required: false },
    verified: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    experience: { type: String },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model<INurse>('Nurse', nurseSchema);
