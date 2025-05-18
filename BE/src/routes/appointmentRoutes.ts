import express from 'express';
import { createAppointment, getPatientAppointments } from '../controllers/appointmentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware,getPatientAppointments);
router.post('/',authMiddleware, createAppointment);

export default router;
