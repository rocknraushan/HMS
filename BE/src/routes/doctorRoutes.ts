import express from 'express';
import { addDoctorProfile, getDoctors, getNearbyDoctors } from '../controllers/doctorControlers';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getDoctors);
router.put('/doctorProfile',authMiddleware,addDoctorProfile);
router.get('/nearby', authMiddleware, getNearbyDoctors);

export default router;
