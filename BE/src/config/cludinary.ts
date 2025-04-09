import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "del1pihyh",
  api_key: process.env.CLOUDINARY_API_KEY || "579956236433145",
  api_secret: process.env.CLOUDINARY_API_SECRET || "iP5QU4ZyS6SEE3Uhp1vsnTZ5FPY",
});

export default cloudinary;
