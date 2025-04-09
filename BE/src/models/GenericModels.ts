import mongoose, { Schema, Document } from 'mongoose';

export interface IAppBanner {
    image: string;
    bannerType:"patient" | "doctor";
    hyperlink: string;
}

const appBannerSchema: Schema<IAppBanner> = new Schema({
    image: { type: String, required: true },
    bannerType: { type: String, enum: ["patient", "doctor"], required: true },
    hyperlink: { type: String, required: false },
}, { timestamps: true });

export  default mongoose.model<IAppBanner>('AppBanner', appBannerSchema);
