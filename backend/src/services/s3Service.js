import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import path from 'path';
import s3Client from '../config/s3.js';

export const uploadToS3 = async (file, folder = 'profiles') => {
  const ext = path.extname(file.originalname);
  const fileName = `${folder}/${crypto.randomBytes(16).toString('hex')}${ext}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};

export const deleteFromS3 = async (fileUrl) => {
  if (!fileUrl || !fileUrl.includes('.amazonaws.com/')) return;
  const key = fileUrl.split('.amazonaws.com/')[1];

  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
};