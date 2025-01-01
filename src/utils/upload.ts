import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-providers';
import * as path from 'node:path';
import { v4 as uuidv4 } from 'uuid';

type UploadedFile= Express.Multer.File;
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;

const s3Client = new S3Client({
  credentials: fromEnv(),
  region,
});

export async function uploadToS3(file: UploadedFile) {
  const key = generateFileKey(file);
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }),
  );
  return getFileUrl(key);
}

function getFileUrl(key: string) {
  return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
}

function generateFileKey(file: Express.Multer.File) {
  const ext = path.extname(file.originalname);
  const uniqueName = `${Date.now()}-${uuidv4()}${ext}`;
  return `${process.env.AWS_BUCKET_DIRECTORY}/${uniqueName}`;
}

