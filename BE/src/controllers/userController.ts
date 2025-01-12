import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import DeviceToken from "../models/devices";
import * as admin from 'firebase-admin';

const FRONTEND_APP_URL = process.env.FRONTEND_APP_URL || 'mediverse://';

export async function createUser(req: Request, res: Response): Promise<any> {
  console.log('request body', req.body);
  const { name, email, password, role, deviceToken, plateform } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists", email: "Email already registered" });

    const allowedRoles = ["doctor", "nurse", "admin", "patient"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.create({ name, email, password, role });
    if (deviceToken) {
      const device = await DeviceToken.create({ plateform: plateform, token: deviceToken, user: user._id });
      await admin.messaging().send({
        notification: {
          title: 'Welcome to Mediverse',
          body: 'You have successfully registered with Mediverse'
        },
        token: deviceToken
      }).then((response) => {
        console.log('Successfully sent message:', response);
      }).catch((error) => {
        console.error('Error sending message:', error);
      })
    }
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function userLogin(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials", email: "Email not registered" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ password: "Incorrect password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function forgetPassword(req: Request, res: Response): Promise<any> {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour expiry

    // Save the token and expiry in the user database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // Generate JWT for secure reset link
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    // Construct the reset URL
    const resetURL = `${FRONTEND_APP_URL}reset-password/${token}`;
    const cred = {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
    console.log(cred, "credentials::::::")
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: 'no-reply@mediverse.com',
      to: email,
      subject: 'Password Reset Request',
      text: `Click the link to reset your password: ${resetURL}`,
      html: `<p>Click the link below to reset your password:</p><a href="${resetURL}">${resetURL}</a>`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error });
  }
}