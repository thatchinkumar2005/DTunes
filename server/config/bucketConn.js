import dotenv from "dotenv";
dotenv.config();
import { S3Client } from "@aws-sdk/client-s3";

const bucketRegion = process.env.BUCKET_REGION;
const bucketAccessKey = process.env.BUCKET_ACCESS_KEY;
const bucketSecretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY;

export const s3 = new S3Client({
  region: bucketRegion,
  credentials: {
    secretAccessKey: bucketSecretAccessKey,
    accessKeyId: bucketAccessKey,
  },
});
