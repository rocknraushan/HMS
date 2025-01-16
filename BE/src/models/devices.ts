import * as admin from 'firebase-admin';
import { Schema, model, Document } from 'mongoose';

// Initialize Firebase Admin SDK
const serviceAccount = require("../../firebase-services.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

type DeviceType = "android" | "ios";

interface IDeviceToken extends Document {
    plateform: DeviceType;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    user: Schema.Types.ObjectId;
}

// Create the DeviceToken schema
const deviceTokenSchema = new Schema<IDeviceToken>({
    plateform: { type: String, enum: ["android", "ios"], required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false }
});

// Create the DeviceToken model
export default model<IDeviceToken>('DeviceToken', deviceTokenSchema);