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
export const getNearbyDoctors = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { lat, lng, pincode } = req.query;

    let doctors: any[] = [];

    if (lat && lng) {
      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lng as string);

      doctors = await Doctor.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            distanceField: 'distance',
            key: 'location', // 👈 specify the field that has the 2dsphere index
            spherical: true,
            maxDistance: 10000,
            query: { isAvailable: true },
          },

        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
        {
          $project: {
            distance: 1,
            isAvailable: 1,
            location: 1,
            rating: 1,
            clinicAddress: 1,
            specialization: 1,
            workingHours: 1,
            homeVisit: 1,
            bio: 1,
            experience: 1,
            licenseNumber: 1,
            education: 1,
            verified: 1,
            user: {
              _id: 1,
              name: 1,
              profilePic: 1,
              gender: 1,
              phone: 1,
              email: 1,
            },
          },
        },
      ]);
    } else if (pincode) {
      doctors = await Doctor.find({
        isAvailable: true,
        'clinicAddress.pincode': pincode,
      }).populate({
        path: 'user',
        select: 'name profilePic gender phone email _id',
      });
    } else {
      return res.status(400).json({ message: 'Provide lat/lng or pincode' });
    }

    return res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};


export const addDoctorProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    const doctorData = {
      specialization: req.body.specialization,
      workingHours: req.body.workingHours,
      clinicAddress: req.body.clinicAddress,
      isAvailable: req.body.isAvailable,
      bio: req.body.bio,
      experience: req.body.experience,
      licenseNumber: req.body.licenseNumber,
      education: req.body.education,
      verified: req.body.verified,
      homeVisit: req.body.homeVisit,
      rating: req.body.rating,
      user: userId, // make sure this is part of upsert
    };

    const updatedDoctor = await Doctor.findOneAndUpdate(
      { user: userId },             // find doctor by user ID
      { $set: doctorData },         // update fields
      { new: true, upsert: true }   // return updated or create new
    );

    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error('Error upserting doctor profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
