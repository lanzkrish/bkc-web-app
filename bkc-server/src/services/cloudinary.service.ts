import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'placeholder_cloud_name', 
  api_key: process.env.CLOUDINARY_API_KEY || 'placeholder_api_key', 
  api_secret: process.env.CLOUDINARY_API_SECRET || 'placeholder_api_secret'
});

export const uploadImage = async (filePath: string, folder = 'bkc_assets') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

export default cloudinary;
