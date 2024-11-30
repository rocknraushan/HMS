import express from 'express';
import {
    getPatients,
    addPatient,
    getPatientById,
    deletePatient,
} from '../controllers/patientControllers';

const router = express.Router();

router.get('/', getPatients);
router.post('/', addPatient);
router.get('/:id', getPatientById);
router.delete('/:id', deletePatient);

export default router;
