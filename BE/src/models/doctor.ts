import mongoose, { Schema, Document } from 'mongoose';
import { IAddress, ILocation } from './User';

export interface IDoctor extends Document {
  user: mongoose.Types.ObjectId;
  specialization: string;
  workingHours?: {
    start: string;
    end: string;
  };
  clinicAddress?:IAddress;
  location?: ILocation;
  isAvailable: boolean;
  bio?: string;
  experience?: string;
  licenseNumber?: string;
  education?: string;
  verified?: boolean;
  rating?: number;
  homeVisit?: boolean;
  clinicName?: string;
  clinicPhone?: string;
  coverImage?: string;
}

// Reusable schemas
const locationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  { _id: false }
);

const addressSchema = new Schema(
  {
    line1: { type: String },
    line2: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
  },
  { _id: false }
);

const workingHoursSchema = new Schema(
  {
    start: {
      type: String,
      required: false
    },
    end: {
      type: String,
      required: false
    },
  },
  { _id: false }
);

const doctorSchema = new Schema<IDoctor>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: false,
      trim: true,
    },
    workingHours: {
      type: workingHoursSchema,
      required: false,
    },
    clinicAddress: {
      type: addressSchema,
      default: undefined,
    },
    clinicName: {
      type: String,
      required: false,
      trim: true,
    },
    clinicPhone: {
      type: String,
      required: false,
      trim: true,
    },
    coverImage: {
      type: String,
      required: false,
      trim: true,
    },
    location: {
      type: locationSchema,
      default: undefined,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    bio: {
      type: String,
      trim: true,
      required: false,
      maxlength: 500
    },
    experience: {
      type: String,
      required: false,
      min: 0,
    },
    licenseNumber: {
      type: String,
      trim: true,
    },
    education: {
      type: String,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    homeVisit: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true },
  }
);

// Geo index
doctorSchema.index({ location: '2dsphere' });

// Example virtual (optional)
doctorSchema.virtual('isHighlyRated').get(function (this: IDoctor) {
  return this.rating && this.rating >= 4.5;
});

export default mongoose.model<IDoctor>('Doctor', doctorSchema);
