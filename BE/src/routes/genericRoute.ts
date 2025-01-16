import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadApk } from '../controllers/genericController';

const router = express.Router();

// Route to upload APK
router.post('/upload-apk', uploadApk);

export default router;