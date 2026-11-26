import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import s3Client from '../config/s3.js';

const hasValidAwsConfig = () =>
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_ACCESS_KEY_ID.startsWith('AKIA') &&
  process.env.AWS_SECRET_ACCESS_KEY &&
  process.env.AWS_BUCKET_NAME;

export const uploadToS3 = async (file, folder = 'profiles') => {
  const ext = path.extname(file.originalname);
  const randomName = `${crypto.randomBytes(16).toString('hex')}${ext}`;

  if (!hasValidAwsConfig()) {
    const localDir = path.join(process.cwd(), 'uploads', folder);
    fs.mkdirSync(localDir, { recursive: true });
    fs.writeFileSync(path.join(localDir, randomName), file.buffer);
    const port = process.env.PORT || 3001;
    return `http://localhost:${port}/uploads/${folder}/${randomName}`;
  }

  const fileName = `${folder}/${randomName}`;
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
  if (!fileUrl) return;

  if (fileUrl.includes('/uploads/')) {
    const relPath = fileUrl.split('/uploads/')[1];
    const fullPath = path.join(process.cwd(), 'uploads', relPath);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    return;
  }

  if (!fileUrl.includes('.amazonaws.com/') || !hasValidAwsConfig()) return;
  const key = fileUrl.split('.amazonaws.com/')[1];
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    })
  );
};