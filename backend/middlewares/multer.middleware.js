import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
  api_key: process.env.CLOUDINARY_API_KEY,  
  api_secret: process.env.CLOUDINARY_API_SECRET,  
});

// Multer configuration with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "property_images",  
    allowed_formats: ["jpg", "jpeg", "png", "gif"],  
  },
});

const upload = multer({ storage: storage });

const uploadFiles = upload.array("images", 5);  

export { upload, uploadFiles };
