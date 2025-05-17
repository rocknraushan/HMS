import mongoose, { Schema, Document } from 'mongoose';
import { IAddress, ILocation } from './User';


interface IReviews {
  user: mongoose.Types.ObjectId; // Reference to the User who wrote the review
  rating: number;               // Rating given (1 to 5)
  comment?: string;             // Optional review text
  createdAt?: Date;             // Timestamp
}
export interface IDoctor extends Document {
  user: mongoose.Types.ObjectId;
  specialization: string;
  workingHours?: {
    start: string;
    end: string;
  };
  clinicAddress?:IAddress;
  reviews:IReviews[];
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

const reviewSchema = new Schema<IReviews>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // Make embedded, not a full sub-document
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
      required: false
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
    reviews: {
      type: [reviewSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true },
  }
);
// Geo index
// Geo index
doctorSchema.index({ location: '2dsphere' });

// Virtual: isHighlyRated
doctorSchema.virtual('isHighlyRated').get(function (this: IDoctor) {
  return this.rating && this.rating >= 4.5;
});

// Helper to compute average rating
function computeAverageRating(reviews: IReviews[] = []): number {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return parseFloat((total / reviews.length).toFixed(1));
}

// Pre-save middleware to auto-update rating
doctorSchema.pre('save', function (next) {
  if (this.isModified('reviews')) {
    this.rating = computeAverageRating(this.reviews);
  }
  next();
});

export default mongoose.model<IDoctor>('Doctor', doctorSchema);

