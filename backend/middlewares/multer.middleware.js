import multer from 'multer';
import cloudinary from '../config/cloudinary.js';  // Import cloudinary
import { CloudinaryStorage } from 'multer-storage-cloudinary'; // Import multer-storage-cloudinary

// Configure multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'properties',  // Specify the folder where images will be stored in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],  // Allowed file formats
  },
});

// Set up multer with the Cloudinary storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // File size limit (5MB)
});
export const uploadFiles = upload.array('images');  // Allow multiple image uploads
