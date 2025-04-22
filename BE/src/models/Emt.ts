import mongoose, { Schema, Document } from 'mongoose';

export interface IEMT extends Document {
  user: mongoose.Types.ObjectId; // Refers to User with role: 'emt'
  isAvailable: boolean;
  vehicleType?: string; // e.g., ambulance, bike, etc.
  vehicleNumber?: string; // e.g., ABC1234
  driverName?: string; // Name of the driver
  driverContact?: string; // Contact number of the driver
  assignedHospital?: string; // Refers to a hospital
  rating?: number;
}

const emtSchema: Schema<IEMT> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    isAvailable: { type: Boolean, default: true },
    vehicleType: { type: String },
    vehicleNumber: { type: String },
    driverName: { type: String },
    driverContact: { type: String },
    assignedHospital: { type: String },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

emtSchema.index({ location: '2dsphere' });

export default mongoose.model<IEMT>('EMT', emtSchema);
