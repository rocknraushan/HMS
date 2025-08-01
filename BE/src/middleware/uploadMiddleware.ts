import multer from 'multer';
import path from 'path';

const apkUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 300 * 1024 * 1024 }, // 300 MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/vnd.android.package-archive') {
            cb(null, true);
        } else {
            cb(new Error('Only APK files are allowed.'));
        }
    },
});


export const uploadMiddleware = apkUpload.single('apkFile');


const upload = multer({ 
    
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            return cb(new Error('Only .jpg, .jpeg and .png files are allowed!'));
        }
        cb(null, true);
    },
});
export const uploadSingleProfilePic = upload.single('profilePic');
export const uploadMultipleImg = upload.fields([
    {name:"profilePic", maxCount: 1},
    {name:"documents", maxCount: 5},
    {name:"prescriptions", maxCount: 5},
    {name:"coverImage", maxCount: 1}
]);
