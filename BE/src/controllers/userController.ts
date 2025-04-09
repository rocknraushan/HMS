import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";
import DeviceToken from "../models/devices";
import * as admin from "firebase-admin";
import streamifier from 'streamifier';
import cloudinary from "../config/cludinary";

const FRONTEND_APP_URL = process.env.FRONTEND_APP_URL || "mediverse://";

export async function createUser(req: Request, res: Response): Promise<any> {
  console.log("request body", req.body);
  const { name, email, password, role, deviceToken, plateform } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message: "User already exists",
        email: "Email already registered",
      });

    const allowedRoles = ["doctor", "nurse", "admin", "patient"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.create({ name, email, password, role });
    if (deviceToken) {
      const device = await DeviceToken.create({
        plateform: plateform,
        token: deviceToken,
        user: user._id,
      });
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
          console.log("Successfully sent message:", response);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
    await user.save();
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ token: token, firstLogin: user.firstLogin });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function userLogin(req: Request, res: Response): Promise<any> {
  const { email, password, loginType, socialData, plateform, deviceToken } =
    req.body;

  try {
    switch (loginType) {
      case "google":
        console.log("Google login data", socialData);
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
          await DeviceToken.create({
            plateform: plateform,
            token: deviceToken,
            user: user._id,
          });

          const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "",
            { expiresIn: "1h" }
          );
          return res
            .status(201)
            .json({ token: token, firstLogin: user.firstLogin });
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
              expiresIn: "1h",
            }
          );
          await DeviceToken.create({
            plateform: plateform,
            token: deviceToken,
            user: socialUser._id,
          });
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
            expiresIn: "1h",
          }
        );

        res.status(200).json({ token: token, firstLogin: user.firstLogin });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function forgetPassword(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour expiry

    // Save the token and expiry in the user database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // Generate JWT for secure reset link
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "1h",
      }
    );

    // Construct the reset URL
    const resetURL = `${FRONTEND_APP_URL}reset-password/${token}`;
    const cred = {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    };
    console.log(cred, "credentials::::::");
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: "no-reply@mediverse.com",
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetURL}`,
      html: `<p>Click the link below to reset your password:</p><a href="${resetURL}">${resetURL}</a>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred.", error });
  }
}



export async function updateProfile(req: Request, res: Response): Promise<any> {
  const { name, email, phone, dob, gender, bloodGroup } = req.body;
  const profilePic = req.file;

  //@ts-ignore
  const user = req.user;
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    let updatedData: Partial<IUser> = {
      name: name || user.name,
      email: email || user.email,
      phone: phone || user.phone,
      dob: dob || user.dob,
      gender: gender || user.gender,
      bloodGroup: bloodGroup || user.bloodGroup,
      firstLogin: false,
    };

    // If a profile picture is provided, upload to Cloudinary
    if (profilePic) {
      const streamUpload = (buffer: Buffer) => {
        return new Promise<{ secure_url: string }>((resolve, reject) => {
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
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
}


export async function getProfile(req: Request, res: Response): Promise<any> {
  try {
    //@ts-ignore
    const userId = req.user?._id; // assuming middleware adds `user` to `req`
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(userId).select(
      "-password -resetPasswordToken -resetPasswordExpiry"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ profile: user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error", error });
  }
}
