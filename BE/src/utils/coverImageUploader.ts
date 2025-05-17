import cloudinary from "../config/cludinary";
import streamifier from "streamifier";

export async function saveCoverImage(
  imageData: Express.Multer.File,
  folderName: string
): Promise<string> {
  return new Promise(async(resolve, reject) => {
    if (imageData && imageData.buffer) {
          const streamUpload = (buffer: Buffer): Promise<{ secure_url: string }> => {
            return new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                { folder: 'profile_pics' },
                (error, result) => {
                  if (result) {
                    resolve(result);
                  } else {
                    reject(error);
                  }
                }
              );
              streamifier.createReadStream(buffer).pipe(stream);
            });
          };
    
          const result = await streamUpload(imageData.buffer);
          resolve(result.secure_url);
        }
        else{
          reject("")
        }
  });
}
