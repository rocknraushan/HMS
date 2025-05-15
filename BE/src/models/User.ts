import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface ILocation {
  type: "Point";
  coordinates: [number, number];
}

export interface IAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password: string;
  role: "doctor" | "nurse" | "admin" | "patient" | "emt";
  matchPassword(enteredPassword: string): Promise<boolean>;
  resetPasswordToken: string | null;
  resetPasswordExpiry: number | null;
  profilePic?: string;
  socialData?: any;
  gender?: string;
  phone?: string;
  firstLogin: boolean;
  location?: ILocation;
  address?: IAddress;

}

const userSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String }, // assuming image buffer; switch to String if URL
    socialData: { type: Object },
    gender: { type: String },
    phone: { type: String },
    firstLogin: { type: Boolean, default: true },
    resetPasswordExpiry: { type: Number, default: null },
    resetPasswordToken: { type: String, default: null },
    address: {
      line1: { type: String },
      line2: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      pincode: { type: String }
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    },
    role: {
      type: String,
      enum: ["doctor", "nurse", "admin", "patient", "emt"],
      default: "patient",
      required: true
    }
  },
  { timestamps: true }
);

// Create geospatial index
userSchema.index({ location: "2dsphere" });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>("User", userSchema);
