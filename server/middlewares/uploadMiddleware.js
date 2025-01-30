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
    } else if (file.fieldname === 'profilePicture') {
      const ext = path.extname(file.originalname);
      filename = `profile-${uniqueSuffix}${ext}`;
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

  // Different validation for video, resume, and profile picture
  if (file.fieldname === 'video' && file.mimetype === 'video/webm') {
    cb(null, true);
  } else if (file.fieldname === 'resume' && 
    ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    .includes(file.mimetype)) {
    cb(null, true);
  } else if (file.fieldname === 'profilePicture' && 
    ['image/jpeg', 'image/png', 'image/jpg']
    .includes(file.mimetype)) {
    cb(null, true);
  } else {
    let fileTypes = "";
    if(file.fieldname === "profilePicture"){
      fileTypes = "JPG, PNG or JPEG files"
    }else if(file.fieldname === "resume"){
      fileTypes = "PDF or DOCX files"
    }
    cb(new Error(`Unsupported file type. ${fileTypes ? "Try " + fileTypes : ""}`), false);
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

export const uploadProfilePicture = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit for profile pictures
  }
}).single('profilePicture');

export const handleUploadError = (err, req, res, next) => {
  console.error('Upload error:', err);
  if (err instanceof multer.MulterError) {
    if(err?.code === "LIMIT_FILE_SIZE"){
      return res.status(400).json({
        success: false,
        message: `File size too large. Please upload a file smaller than ${err?.field === "resume" ? '10MB' : err?.field === "video" ? "50MB" : "5MB"}`
      });
    }
    return res.status(400).json({
      success: false,
      message: `${err.message}`
    });
  } else if (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
  next();
};