"use server";
import authOptions from "@app/api/auth/[...nextauth]";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
   region: process.env.AWS_BUCKET_REGION,
   credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   },
})

export async function getSignedURL() {
    const session = await authOptions()
    if (!session) {
        return { failure: "Not authenticated"}
    }

const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: "test-file",
})

const signedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 3600,
})

    return {
        success: {url: ""}
    }
}