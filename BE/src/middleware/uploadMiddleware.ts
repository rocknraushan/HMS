import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/vnd.android.package-archive') {
            cb(null, true);
        } else {
            cb(new Error('Only APK files are allowed.'));
        }
    },
});

export const uploadMiddleware = upload.single('apkFile');
