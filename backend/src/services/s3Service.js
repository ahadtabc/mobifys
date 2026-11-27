import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs/promises';
import s3Client from '../config/s3.js';
import { env } from '../config/env.js';

const hasValidAwsConfig = () =>
  Boolean(
    env.aws.accessKeyId &&
      env.aws.accessKeyId.startsWith('AKIA') &&
      env.aws.secretAccessKey &&
      env.aws.bucketName
  );

export const uploadToS3 = async (file, folder = 'profiles') => {
  const ext = path.extname(file.originalname);
  const randomName = `${crypto.randomBytes(16).toString('hex')}${ext}`;

  if (!hasValidAwsConfig()) {
    const localDir = path.join(process.cwd(), 'uploads', folder);
    await fs.mkdir(localDir, { recursive: true });
    await fs.writeFile(path.join(localDir, randomName), file.buffer);
    return `http://localhost:${env.port}/uploads/${folder}/${randomName}`;
  }

  const fileName = `${folder}/${randomName}`;
  await s3Client.send(
    new PutObjectCommand({
      Bucket: env.aws.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return `https://${env.aws.bucketName}.s3.${env.aws.region}.amazonaws.com/${fileName}`;
};

export const deleteFromS3 = async (fileUrl) => {
  if (!fileUrl) return;

  if (fileUrl.includes('/uploads/')) {
    const relPath = fileUrl.split('/uploads/')[1];
    const fullPath = path.join(process.cwd(), 'uploads', relPath);
    await fs.unlink(fullPath).catch(() => {});
    return;
  }

  if (!fileUrl.includes('.amazonaws.com/') || !hasValidAwsConfig()) return;
  const key = fileUrl.split('.amazonaws.com/')[1];
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: env.aws.bucketName,
      Key: key,
    })
  );
};

export const syncProfileImage = async ({
  currentImageUrl = '',
  file,
  removeImage = false,
  folder = 'profiles',
}) => {
  if (file) {
    const nextImageUrl = await uploadToS3(file, folder);
    if (currentImageUrl) {
      await deleteFromS3(currentImageUrl).catch(() => {});
    }
    return nextImageUrl;
  }

  if (removeImage && currentImageUrl) {
    await deleteFromS3(currentImageUrl).catch(() => {});
    return '';
  }

  return currentImageUrl;
};
