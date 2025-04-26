import express from 'express';
import { getAppointments, createAppointment } from '../controllers/appointmentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getAppointments);
router.post('/',authMiddleware, createAppointment);

export default router;
