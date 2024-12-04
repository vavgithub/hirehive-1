// middleware/upload.middleware.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_PATH = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Upload directory:', UPLOAD_PATH);
    cb(null, UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    let filename;

    // Check file type and generate appropriate filename
    if (file.fieldname === 'video') {
      filename = `assessment-${uniqueSuffix}.webm`;
    } else if (file.fieldname === 'resume') {
      const ext = path.extname(file.originalname);
      filename = `resume-${uniqueSuffix}${ext}`;
    }

    console.log('Generated filename:', filename);
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  console.log('Incoming file:', {
    fieldname: file.fieldname,
    mimetype: file.mimetype
  });

  // Different validation for video and resume
  if (file.fieldname === 'video' && file.mimetype === 'video/webm') {
    cb(null, true);
  } else if (file.fieldname === 'resume' && 
    ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    .includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type for ${file.fieldname}`), false);
  }
};

// Export separate middleware for different upload types
export const uploadVideo = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
}).single('video');

export const uploadResume = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit for resumes
  }
}).single('resume');

export const handleUploadError = (err, req, res, next) => {
  console.error('Upload error:', err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`
    });
  } else if (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
  next();
};