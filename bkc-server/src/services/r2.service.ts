import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const accountId = process.env.R2_ACCOUNT_ID || 'placeholder_account_id';
const accessKeyId = process.env.R2_ACCESS_KEY_ID || 'placeholder_access_key';
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || 'placeholder_secret_key';
const bucketName = process.env.R2_BUCKET_NAME || 'bkc-assets';

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

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
    
    // Note: To get public URL, you need to configure a custom domain or r2.dev subdomain in Cloudflare
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
