import express from 'express';
import { addDoctorProfile, addDoctorReviews, getDoctorReviews, getDoctors, getNearbyDoctors } from '../controllers/doctorControlers';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getDoctors);
router.put('/doctorProfile',authMiddleware,addDoctorProfile);
router.get('/nearby', authMiddleware, getNearbyDoctors);
router.post('/reviews',authMiddleware,addDoctorReviews);
router.get("/reviews",authMiddleware,getDoctorReviews)

export default router;
