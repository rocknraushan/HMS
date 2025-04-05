import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password: string;
  role: "doctor" | "nurse" | "admin" | "patient";
  matchPassword(enteredPassword: string): Promise<boolean>;
  resetPasswordToken: string;
  resetPasswordExpiry: number;
  profilePic: string;
  socialData: any;
  dob: string;
  bloodGroup: string;
  gender: string;
  phone: string;
  firstLogin: boolean;
}

const userSchema: Schema<IUser> = new Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, required: false, data : Buffer },
  socialData: { type: Object, required: false },
  dob: { type: String, required: false },
  bloodGroup: { type: String, required: false },
  gender: { type: String, required: false },
  phone: { type: String, required: false },
  firstLogin: { type: Boolean, default: true },
  role: {
    type: String,
    enum: ["doctor", "nurse", "admin", "patient"],
    default: "patient",
    required: true,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>("User", userSchema);
