// config/paths.js
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go up one level from config directory to get root
export const rootDir = path.join(__dirname, '..');
export const uploadsDir = path.join(rootDir, 'uploads');

// Ensure uploads directory exists
export const initializeUploadDir = async () => {
  try {
    await fs.access(uploadsDir);
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true });
  }
};