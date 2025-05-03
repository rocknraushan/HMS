import { Request, Response } from 'express';
import Doctor, { IDoctor } from '../models/doctor';
import { AuthRequest } from 'index';

export const getDoctors = async (req: Request, res: Response): Promise<void> => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};



// GET /api/doctors/nearby?lat=xx&lng=yy or ?pincode=xxxxxx
export const getNearbyDoctors= async (req:AuthRequest, res:Response):Promise<any>=> {
  try {
    const { lat, lng, pincode } = req.query;

    let doctors = [];

    if (lat && lng) {
      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lng as string);

      doctors = await Doctor.find({
        isAvailable: true,
        'clinicAddress.location': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: 10000, // 10 km range
          },
        },
      }).populate('user');
    } else if (pincode) {
      doctors = await Doctor.find({
        isAvailable: true,
        'clinicAddress.address.pincode': pincode,
      }).populate('user');
    } else {
      return res.status(400).json({ message: 'Provide lat/lng or pincode' });
    }

    return res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export const addDoctorProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const {specialization, workingHours, clinicAddress, isAvailable, bio, experience, licenseNumber, education } = req.body;
        const newDoctor = new Doctor({ user:req.user?._id, specialization, workingHours, clinicAddress, isAvailable, bio, experience, licenseNumber, education });
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}