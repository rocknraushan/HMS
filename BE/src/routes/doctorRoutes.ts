import express from 'express';
import { getDoctors } from '../controllers/doctorControlers';

const router = express.Router();

router.get('/', getDoctors);

export default router;
