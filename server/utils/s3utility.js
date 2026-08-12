// utils/s3Uploader.js
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadsDir } from '../config/paths.js';
import axios from 'axios';
import { captureError } from "./errorHandler.js";

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
// bucketOverride (optional): when set, uploads to that bucket instead of AWS_S3_BUCKET_NAME.
// Existing callers omit it and keep current behavior.
export const uploadToS3 = async (inputPath, folder, bucketOverride) => {
  try {
    const filePath = path.isAbsolute(inputPath)
      ? inputPath
      : path.join(uploadsDir, inputPath);

    const fileContent = await fs.readFile(filePath);
    const fileName = path.basename(filePath);

    const envFolder = process.env.AWS_ENV_FOLDER;
    const s3Key = `uploads/${envFolder}/${folder}/${Date.now()}-${fileName}`;

    const contentType = getMimeType(filePath);
    const bucket = bucketOverride || process.env.AWS_S3_BUCKET_NAME;

    // ✅ Upload to S3
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: s3Key,
      Body: fileContent,
      ContentType: contentType,
      ACL: 'private',
    });

    await s3Client.send(command);

    await fs.unlink(filePath); // Clean up local file

    // Dedicated/private buckets (e.g. voice interview) aren't on CloudFront —
    // return the object key so callers can mint a short-lived presigned GET URL.
    if (bucketOverride) {
      return s3Key;
    }

    const cloudfrontDomain = process.env.AWS_CLOUDFRONT_DOMAIN;
    return `${cloudfrontDomain}/${s3Key}`;
  } catch (error) {
    captureError(error, { file: "s3utility.js", action: "s3Upload" });
    console.error('Error uploading to S3 (v3):', error);
    throw error;
  }
};

export const uploadGoogleImageToS3 = async (imageUrl, folder) => {
  try {
    // Step 1: Download image as buffer
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });

    const buffer = Buffer.from(response.data, 'binary');
    const contentType = response.headers['content-type'];

    // Step 2: Generate file name using Date.now()
    const extension = path.extname(new URL(imageUrl).pathname) || '';
    const baseName = path.basename(new URL(imageUrl).pathname, extension);
    const fileName = `${Date.now()}-${baseName}${extension}`;

    const envFolder = process.env.AWS_ENV_FOLDER;
    const s3Key = `uploads/${envFolder}/${folder}/${fileName}`;

    // Step 3: Upload to S3
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: s3Key,
      Body: buffer,
      ContentType: contentType,
      ACL: 'private',
    });

    await s3Client.send(command);

    // Step 4: Return CloudFront URL
    const cloudfrontDomain = process.env.AWS_CLOUDFRONT_DOMAIN;
    return `${cloudfrontDomain}/${s3Key}`;
  } catch (error) {
    captureError(error, { file: "s3utility.js", action: "s3Upload" });
    console.error('Error uploading Google image to S3:', error);
    throw new Error(error?.message || 'Failed to upload image from URL to S3');
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
  if (ext === '.webm') return 'audio/webm';
  if (ext === '.mp3') return 'audio/mpeg';
  if (ext === '.wav') return 'audio/wav';
  if (ext === '.ogg') return 'audio/ogg';
  return 'application/octet-stream';
};

// 📁 Path Helper
export const getUploadPath = (filename) => {
  return path.join(rootDir, 'uploads', filename);
};


// bucketOverride (optional): same semantics as uploadToS3 — omit for default bucket.
export const generatePresignedUrl = async (key, contentType, bucketOverride) => {
  const command = new PutObjectCommand({
    Bucket: bucketOverride || process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 }); // 5 min expiry
  return url;
};

/**
 * Presigned GET for private-bucket playback (voice interview TTS / responses).
 * @param {string} key - S3 object key
 * @param {string} [bucketOverride] - defaults to AWS_S3_BUCKET_NAME
 * @param {number} [expiresInSeconds=900] - default 15 minutes
 */
export const generatePresignedGetUrl = async (
  key,
  bucketOverride,
  expiresInSeconds = 60 * 15
) => {
  const command = new GetObjectCommand({
    Bucket: bucketOverride || process.env.AWS_S3_BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
};