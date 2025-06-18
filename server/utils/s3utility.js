// utils/s3Uploader.js
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadsDir } from '../config/paths.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// ✅ Create S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// 🔽 Upload Function
export const uploadToS3 = async (inputPath, folder) => {
  try {
    const filePath = path.isAbsolute(inputPath)
      ? inputPath
      : path.join(uploadsDir, inputPath);

    const fileContent = await fs.readFile(filePath);
    const fileName = path.basename(filePath);

    const envFolder = process.env.AWS_ENV_FOLDER;
    const s3Key = `uploads/${envFolder}/${folder}/${Date.now()}-${fileName}`;

    const contentType = getMimeType(filePath);

    // ✅ Upload to S3
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: s3Key,
      Body: fileContent,
      ContentType: contentType,
      ACL: 'private',
    });

    await s3Client.send(command);

    await fs.unlink(filePath); // Clean up local file

    const cloudfrontDomain = process.env.AWS_CLOUDFRONT_DOMAIN;
    return `${cloudfrontDomain}/${s3Key}`;
  } catch (error) {
    console.error('Error uploading to S3 (v3):', error);
    throw error;
  }
};

// 📦 MIME Helper
const getMimeType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (['.jpg', '.jpeg'].includes(ext)) return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.pdf') return 'application/pdf';
  if (ext === '.mp4') return 'video/mp4';
  return 'application/octet-stream';
};

// 📁 Path Helper
export const getUploadPath = (filename) => {
  return path.join(rootDir, 'uploads', filename);
};
