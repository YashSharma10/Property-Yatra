import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();
// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,  // Replace with your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET,  // Replace with your Cloudinary API secret
});

// Multer configuration with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "property_images",  // Cloudinary folder where images will be stored
    allowed_formats: ["jpg", "jpeg", "png", "gif"],  // Allowed image formats
  },
});

// Multer upload middleware
const upload = multer({ storage: storage });

// Middleware to handle file uploads (single image or multiple)
const uploadFiles = upload.array("images", 5);  // Max 5 images per upload

export { upload, uploadFiles };
