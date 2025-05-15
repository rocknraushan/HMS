import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import Doctor, { IDoctor } from "../models/doctor";
import Nurse, { INurse } from "../models/Nurse";
import EMT, { IEMT } from "../models/Emt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import DeviceToken from "../models/devices";
import * as admin from "firebase-admin";
import streamifier from 'streamifier';
import cloudinary from "../config/cludinary";
import otpGenerator from 'otp-generator'
import Patient from "../models/Patients";
import { AuthRequest } from "index";
import { tryParseJSON } from "../utils/GenericFunctions";

const FRONTEND_APP_URL = "http://www.evaidhya.site/";

export async function createUser(req: Request, res: Response): Promise<any> {
  const { name, email, password, role, deviceToken, plateform } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message: "User already exists",
        errors: { email: "Email already registered" }
      });

    // Check if the role is valid
    const allowedRoles = ["doctor", "nurse", "patient", "emt"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role",errors: { role: "Role not allowed" } });
    }

    // Create the User document
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // Role-specific model creation
    switch (role) {
      case "patient":
        await Patient.create({
          user: user._id,
          name: user.name,
          age: 0,
          gender: "",
          contact: "",
          address: "",
          medicalHistory: [],
          prescriptions: [],
          documents: [],
        });
        break;

      case "doctor":
        await Doctor.create({
          user: user._id,
          isAvailable: true,
          specialization: "",
        });
        break;

      case "nurse":
        await Nurse.create({
          user: user._id,
          isAvailable: true,
        });
        break;

      case "emt":
        await EMT.create({
          user: user._id,
          isAvailable: true,
        });
        break;

      case "admin":
        // Admin can be created without extra fields
        break;

      default:
        return res.status(400).json({ message: "Invalid role" });
    }


    // Handle device token if provided (for push notifications)
    if (deviceToken) {
      const device = await DeviceToken.findOneAndUpdate(
        { token: deviceToken },
        {
          plateform: plateform,
          token: deviceToken,
          user: user._id
        },
        {
          new: true,       // return the updated document
          upsert: true,    // create if not exists
          setDefaultsOnInsert: true
        }
      );
    

      // Send a welcome notification
      await admin
        .messaging()
        .send({
          notification: {
            title: "Welcome to Mediverse",
            body: "You have successfully registered with Mediverse",
          },
          token: deviceToken,
        })
        .then((response) => {
          // // console.log("Successfully sent message:", response);
        })
        .catch((error) => {
          // // console.error("Error sending message:", error);
        });
    }

    // Save user data
    await user.save();

    // Generate JWT token for the user
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "",
      { expiresIn: "7d" }
    );

    // Respond with the token and user details
    res.status(201).json({
      token: token,
      firstLogin: user.firstLogin,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" + String(err) });
  }
}

export async function userLogin(req: Request, res: Response): Promise<any> {
  // TODO: add validation to validate the socail data and email  using google client
  const { email, password, loginType, socialData, plateform, deviceToken } =
    req.body;

  try {
    switch (loginType) {
      case "google":
        // // console.log("Google login data", socialData);
        const socialUser = await User.findOne({ email: socialData.email });
        if (!socialUser) {
          const dummyPassword = crypto.randomBytes(16).toString("hex");

          const user = await User.create({
            firstName: socialData.givenName,
            lastName: socialData.familyName,
            name: socialData.name,
            socialData: socialData,
            email: email,
            password: dummyPassword,
            role: "patient",
          });
          if (deviceToken) {
            const device = await DeviceToken.findOneAndUpdate(
              { token: deviceToken },
              {
                plateform: plateform,
                token: deviceToken,
                user: user._id
              },
              {
                new: true,       // return the updated document
                upsert: true,    // create if not exists
                setDefaultsOnInsert: true
              }
            );
          }

          const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "",
            { expiresIn: "7d" }
          );
          return res.status(201).json({ token: token, firstLogin: user.firstLogin, role: user.role });
        } else {
          if (
            socialUser.socialData &&
            socialUser.socialData.id !== socialData.id
          ) {
            return res.status(400).json({
              message: "Google account already linked with another email",
            });
          }
          const token = jwt.sign(
            { id: socialUser._id, role: socialUser.role },
            process.env.JWT_SECRET || "",
            {
              expiresIn: "7d",
            }
          );
          if (deviceToken) {
            const device = await DeviceToken.findOneAndUpdate(
              { token: deviceToken },
              {
                plateform: plateform,
                token: deviceToken,
                user: socialUser._id
              },
              {
                new: true,       // return the updated document
                upsert: true,    // create if not exists
                setDefaultsOnInsert: true
              }
            );
          }
          return res
            .status(200)
            .json({ token: token, firstLogin: socialUser.firstLogin });
        }
      default:
        const user = await User.findOne({ email });
        if (!user)
          return res.status(400).json({
            message: "Invalid credentials",
            email: "Email not registered",
          });

        const isMatch = await user.matchPassword(password);
        if (!isMatch)
          return res.status(400).json({ password: "Incorrect password" });

        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET || "",
          {
            expiresIn: "7d",
          }
        );

        res.status(201).json({ token: token, firstLogin: user.firstLogin, role: user.role });
    }
  } catch (err) {
    // console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function forgetPassword(req: Request, res: Response): Promise<any> {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        errors: { email: "Email not registered" }
      });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    });

    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Save OTP and expiry to the user model
    user.resetPasswordToken = otp;
    user.resetPasswordExpiry = otpExpiry;
    await user.save();

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: "no-reply@mediverse.com",
      to: email,
      subject: "Your Mediverse Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2c3e50;">Password Reset OTP</h2>
            <p>Hello,</p>
            <p>Your OTP for resetting your password is:</p>
            <h1 style="color: #007BFF;">${otp}</h1>
            <p>This OTP will expire in 10 minutes.</p>
            <p>If you didn’t request this, you can safely ignore this email.</p>
            <p>Thanks,<br/>The Mediverse Team</p>
          </div>
        </div>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "OTP sent to your email. Please check your inbox."
    });

  } catch (error) {
    // console.error("Error in forgetPassword:", error);
    res.status(500).json({ message: "An error occurred.", error });
  }
}

export async function verifyOtpAndResetPassword(req: Request, res: Response): Promise<any> {
  try {
    const { email, otp, newPassword } = req.body;
    // console.log(req.body, "body")
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check OTP and expiry
    // console.log(user.resetPasswordToken, "user otp")
    // console.log(user.resetPasswordExpiry, "user otp expiry")
    if (
      user.resetPasswordToken !== otp ||
      !user.resetPasswordExpiry ||
      Date.now() > user.resetPasswordExpiry
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash new password

    // Update password and clear OTP fields
    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpiry = null;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });

  } catch (error) {
    // console.error("Error in verifyOtpAndResetPassword:", error);
    res.status(500).json({ message: "An error occurred.", error });
  }
}

// Utility function to safely parse JSON


export async function updateProfile(req: AuthRequest, res: Response): Promise<any> {
  const profilePic = req.file;
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    const baseFields: (keyof IUser)[] = ['name', 'email', 'phone', 'gender', 'firstName', 'lastName',"address",];
    const updatedData: Partial<IUser> = { firstLogin: false };

    // Base profile fields update
    for (const field of baseFields) {
      if (req.body[field]) {
        updatedData[field] = req.body[field];
      }
    }

    // Upload profile picture if provided
    if (profilePic && profilePic.buffer) {
      const streamUpload = (buffer: Buffer): Promise<{ secure_url: string }> => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'profile_pics' },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };

      const result = await streamUpload(profilePic.buffer);
      updatedData.profilePic = result.secure_url;
      // console.log('Profile pic uploaded to:', result.secure_url);
    }

    // Parse JSON fields (like 'workingHours', 'clinicAddress') before updating
    

    // Update main user model
    const updatedUser = await User.findByIdAndUpdate(user._id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found after update' });
    }

    // Role-specific updates
    switch (user.role) {
      case 'patient':
        await Patient.findOneAndUpdate(
          { user: user._id },
          {
            ...req.body,
            age: req.body.age,
            contact: req.body.contact,
            address: req.body.address,
            medicalHistory: req.body.medicalHistory,
            prescriptions: req.body.prescriptions,
            documents: req.body.documents,
          },
          { upsert: true, new: true }
        );
        break;

        case 'doctor':
          const workingHours = tryParseJSON(req.body.workingHours);
          const clinicAddress = tryParseJSON(req.body.clinicAddress);
          const location = tryParseJSON(req.body.location);
        // console.log(location, "location====>")
          await Doctor.findOneAndUpdate(
            { user: user._id },
            {
              ...req.body,
              isAvailable: req.body.isAvailable,
              workingHours,
              clinicAddress,
              location,
            },
            { upsert: true, new: true }
          );
          break;
        
      case 'nurse':
        await Nurse.findOneAndUpdate(
          { user: user._id },
          {
            specialization: req.body.specialization,
            experience: req.body.experience,
            bio: req.body.bio,
            licenseNumber: req.body.licenseNumber,
            education: req.body.education,
          },
          { upsert: true, new: true }
        );
        break;

      case 'emt':
        await EMT.findOneAndUpdate(
          { user: user._id },
          {
            isAvailable: req.body.isAvailable,
            vehicleType: req.body.vehicleType,
            vehicleNumber: req.body.vehicleNumber,
            driverName: req.body.driverName,
            driverContact: req.body.driverContact,
            assignedHospital: req.body.assignedHospital,
          },
          { upsert: true, new: true }
        );
        break;

      default:
        // console.warn(`No role-specific model handler for role: ${user.role}`);
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    // console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
}



export async function getProfile(req: AuthRequest, res: Response): Promise<any> {
  try {
    // @ts-ignore
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(userId)
      .select("name email role phone profilePic firstLogin address gender lastName location address");

    if (!user) return res.status(404).json({ message: "User not found" });

    let roleData: Record<string, any> = {};

    switch (user.role) {
      case 'patient': {
        const patient = await Patient.findOne({ user:userId }).select("height weight allergies medicalHistory prescriptions documents bloodGroup dob age");
        if (patient) roleData = patient.toObject();
        break;
      }
      case 'doctor': {
        const doctor = await Doctor.findOne({ user:userId }).select("specialization isAvailable experience licenseNumber verified bio workingHours clinicAddress rating verified education");
        // console.log(doctor, "doctor data===>")
        if (doctor) roleData = doctor.toObject();
        break;
      }
      case 'nurse': {
        const nurse = await Nurse.findOne({ user:userId }).select("isAvailable specialization experience verified bio education licenseNumber rating");
        if (nurse) roleData = nurse.toObject();
        break;
      }
      case 'emt': {
        const emt = await EMT.findOne({ user:userId }).select("isAvailable location ambulanceNumber");
        if (emt) roleData = emt.toObject();
        break;
      }
    }

    res.status(200).json({
      profile: {
        ...roleData,
        ...user.toObject(),
      }
    });
  } catch (error) {
    // console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error", error });
  }
}

export async function uploadProfilePic(req: AuthRequest, res: Response): Promise<any> {
  const user = req.user;
  const profilePic = req.file;
  // console.log(user,profilePic, "<======user and profile pic")

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    if (profilePic?.buffer) {
      const streamUpload = (buffer: Buffer): Promise<{ secure_url: string }> => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'profile_pics' },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };

      const result = await streamUpload(profilePic.buffer);

      await User.findByIdAndUpdate(user._id, { profilePic: result.secure_url });

      res.status(200).json({
        message: 'Profile picture updated successfully',
        profilePicUrl: result.secure_url,
      });
    } else {
      res.status(400).json({ message: 'No profile picture provided' });
    }

  } catch (error) {
    // console.error('Error updating profile picture:', error);
    res.status(500).json({ message: 'Server error', error });
  }
}



export async function updateLocation(req: AuthRequest, res: Response): Promise<any> {
  const user = req.user;
  const { latitude, longitude } = req.body;

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        location: {
          type: "Point",
          coordinates: [longitude, latitude]
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found after update' });
    }

    res.status(200).json({
      message: 'Location updated successfully',
      location: updatedUser.location,
    });
  } catch (error) {
    // console.error('Error updating location:', error);
    res.status(500).json({ message: 'Server error', error });
  }
}