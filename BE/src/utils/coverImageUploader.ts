import cloudinary from "../config/cludinary";
import streamifier from 'streamifier';

export async function saveCoverImage(imageData:any,folderName:string) {
    return new Promise(async(resolve, reject) => {
        try{
    if (imageData && imageData.buffer) {
              const streamUpload = (buffer: Buffer): Promise<{ secure_url: string }> => {
                return new Promise((resolve, reject) => {
                  const stream = cloudinary.uploader.upload_stream(
                    { folder: 'clinic_cover_images' },
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
              
              // console.log('Profile pic uploaded to:', result.secure_url);
            }
        }
        catch (error) {
            console.error('Error uploading image:', error);
            reject(error);

        }
    })
}