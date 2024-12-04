// middleware/upload.middleware.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple upload path
const UPLOAD_PATH = path.join(__dirname, '..', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Upload directory:', UPLOAD_PATH);
    cb(null, UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `assessment-${uniqueSuffix}.webm`;
    console.log('Generated filename:', filename);
    cb(null, filename);
  }
});

// Configure file filter
const fileFilter = (req, file, cb) => {
  console.log('Incoming file:', {
    fieldname: file.fieldname,
    mimetype: file.mimetype
  });

  if (file.mimetype === 'video/webm') {
    cb(null, true);
  } else {
    cb(new Error('Only video/webm format is allowed'), false);
  }
};

// Create and export multer instance
export const uploadMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
}).single('video');

// Error handling middleware
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