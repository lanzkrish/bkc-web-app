import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const accountId = process.env.R2_ACCOUNT_ID || 'placeholder_account_id';
const accessKeyId = process.env.R2_ACCESS_KEY_ID || 'placeholder_access_key';
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || 'placeholder_secret_key';
const bucketName = process.env.R2_BUCKET_NAME || 'bhubaneswarkitchencafe';

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const uploadImageToR2 = async (base64Data: string, folder = 'bkc-images') => {
  try {
    let mimeType = 'image/jpeg';
    let buffer: Buffer;

    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      mimeType = matches[1];
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(base64Data, 'base64');
    }

    const ext = mimeType.includes('png') ? 'png' : mimeType.includes('webp') ? 'webp' : 'jpg';
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: mimeType,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    const publicUrl = process.env.R2_PUBLIC_URL 
      ? `${process.env.R2_PUBLIC_URL}/${fileName}`
      : `https://${bucketName}.${accountId}.r2.cloudflarestorage.com/${fileName}`;

    return { url: publicUrl, key: fileName };
  } catch (error) {
    console.error('Error uploading image to R2:', error);
    throw error;
  }
};

export const deleteFromR2 = async (keyOrUrl: string) => {
  try {
    let key = keyOrUrl;
    if (keyOrUrl.startsWith('http://') || keyOrUrl.startsWith('https://')) {
      const publicBase = process.env.R2_PUBLIC_URL || '';
      if (publicBase && keyOrUrl.startsWith(publicBase)) {
        key = keyOrUrl.replace(`${publicBase}/`, '');
      } else {
        const urlObj = new URL(keyOrUrl);
        key = urlObj.pathname.replace(/^\//, '');
      }
    }

    await s3.send(new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    }));
    return true;
  } catch (error) {
    console.error('Error deleting from R2:', error);
    return false;
  }
};

export const uploadVideo = async (filePath: string, fileName: string, contentType: string = 'video/mp4') => {
  try {
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileStream,
      ContentType: contentType,
    };
    
    await s3.send(new PutObjectCommand(uploadParams));
    
    const publicUrl = process.env.R2_PUBLIC_URL 
      ? `${process.env.R2_PUBLIC_URL}/${fileName}`
      : `https://${bucketName}.${accountId}.r2.cloudflarestorage.com/${fileName}`;
      
    return publicUrl;
  } catch (error) {
    console.error('Error uploading video to R2:', error);
    throw error;
  }
};

export default s3;
