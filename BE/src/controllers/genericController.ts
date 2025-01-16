import { Request, Response } from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import fs from 'fs';

// Define a schema for the APK file
interface apkSchemaType extends Document {
    filename: String;
    data: Buffer;
    apkType: "debug" | "release";
};
const apkSchema = new mongoose.Schema<apkSchemaType>({
    filename: { type: String, required: true },
    data: { type: Buffer, required: true },
    apkType: { type: String, enum: ["debug", "release"], required: true }
});

const Apk = mongoose.model('Apk', apkSchema);

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Controller to handle APK upload and replacement
export async function uploadApk(req: Request, res: Response): Promise<void> {
    console.log('uploadApk', req.file);

    try {
        const file = req.file;

        if (!file) {
            res.status(400).send('No file uploaded.');
            return;
        }

        const { apkType } = req.body;

        if (!apkType || (apkType !== 'debug' && apkType !== 'release')) {
            res.status(400).send('Invalid or missing APK type.');
            return;
        }

        // Check if an APK of the same type already exists
        const existingApk = await Apk.findOne({ apkType });

        if (existingApk) {
            // Replace the existing APK
            existingApk.filename = file.originalname;
            existingApk.data = file.buffer;
            existingApk.apkType = apkType;
            await existingApk.save();
        } else {
            // Create a new APK entry
            const newApk = new Apk({
                filename: file.originalname,
                data: file.buffer,
                apkType,
            });
            await newApk.save();
        }

        res.status(200).send('APK file uploaded and replaced successfully.');
    } catch (error) {
        console.error('Error during APK upload:', error);
        res.status(500).send('An error occurred while uploading the APK file.');
    }
}

export async function getApk(req: Request, res: Response): Promise<void> {
    try {
        const { apkType } = req.params;

        // Validate apkType
        if (!apkType || (apkType !== 'debug' && apkType !== 'release')) {
            res.status(400).send('Invalid or missing APK type.');
            return;
        }

        // Fetch APK from the database
        const apk = await Apk.findOne({ apkType });

        if (!apk) {
            res.status(404).send('APK file not found.');
            return;
        }

        // Set headers and send the file
        res.setHeader('Content-Disposition', `attachment; filename="${apk.filename}"`);
        res.setHeader('Content-Type', 'application/vnd.android.package-archive');
        res.status(200).send(apk.data);
    } catch (error) {
        console.error('Error during APK retrieval:', error);
        res.status(500).send('An error occurred while retrieving the APK file.');
    }
}