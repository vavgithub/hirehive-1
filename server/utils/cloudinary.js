// utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadsDir } from '../config/paths.js';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the root directory (go up one level from utils)
const rootDir = path.join(__dirname, '..');

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filename, folder) => {
    const filePath = path.join(uploadsDir, filename);
    
    try {
      // Verify file exists before attempting upload
      await fs.access(filePath);
      
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folder,
        resource_type: 'auto',
        use_filename: true,
        unique_filename: true
      });
  
      // Delete the temporary file after successful upload
      await fs.unlink(filePath);
      return result.secure_url;
      
    } catch (error) {
      console.error('Error in uploadToCloudinary:', error);
      
      // Try to clean up temp file if it exists
      try {
        await fs.access(filePath);
        await fs.unlink(filePath);
      } catch (unlinkError) {
        // File doesn't exist or can't be deleted, ignore
      }
      
      throw error;
    }
  };

// Helper function to get upload path
export const getUploadPath = (filename) => {
  return path.join(rootDir, 'uploads', filename);
};