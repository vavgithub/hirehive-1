// utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadsDir } from '../config/paths.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (inputPath, folder) => {
  try {
    // Check if inputPath is already a full path or just a filename
    const filePath = path.isAbsolute(inputPath) ? 
      inputPath : 
      path.join(uploadsDir, inputPath);
    
    console.log('Attempting to upload from path:', filePath);

    // Verify file exists before attempting upload
    await fs.access(filePath);
    
    // Determine resource type based on file extension
    const ext = path.extname(filePath).toLowerCase();
    let resourceType = 'raw'; // default

    if (['.mp4', '.webm', '.mov'].includes(ext)) {
      resourceType = 'video';
    } else if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
      resourceType = 'image';
    } else if (['.pdf', '.doc', '.docx'].includes(ext)) {
      resourceType = 'raw';
    }

    console.log('Uploading file as resource type:', resourceType);

    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: resourceType,
      use_filename: true,
      unique_filename: true
    });

    console.log('Cloudinary upload successful:', result.secure_url);

    // Delete the temporary file after successful upload
    await fs.unlink(filePath);
    return result.secure_url;
    
  } catch (error) {
    console.error('Error in uploadToCloudinary:', error);
    
    // If we have a filePath, try to clean up
    if (inputPath) {
      try {
        const filePath = path.isAbsolute(inputPath) ? 
          inputPath : 
          path.join(uploadsDir, inputPath);
        await fs.access(filePath);
        await fs.unlink(filePath);
      } catch (unlinkError) {
        // File doesn't exist or can't be deleted, ignore
      }
    }
    
    throw error;
  }
};

// Helper function to get upload path
export const getUploadPath = (filename) => {
  return path.join(rootDir, 'uploads', filename);
};