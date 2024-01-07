// app/api/documents/route.ts
import { NextRequest, NextResponse } from "next/server";

import {
    S3Client,
    ListObjectsCommand,
    PutObjectCommand,
} from "@aws-sdk/client-s3";

const Bucket = process.env.AMPLIFY_BUCKET;
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

function generateUUID(): string {
    const uuidFormat: number[] = [8, 4, 4, 4, 12];
    let uuid = "";

    for (const segment of uuidFormat) {
        for (let i = 0; i < segment; i++) {
            const randomChar = Math.floor(Math.random() * 16).toString(16);
            uuid += randomChar;
        }
        uuid += "-";
    }

    // Remove the trailing dash
    uuid = uuid.slice(0, -1);

    return uuid;
}

let fileName = "";

// endpoint to get the list of files in the bucket
export async function GET() {
    const response = await s3.send(new ListObjectsCommand({ Bucket }));
    return NextResponse.json(response?.Contents ?? []);
}

// endpoint to upload a file to the bucket
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const files = formData.getAll("itemImage") as File[];

    const response = await Promise.all(
        files.map(async (file) => {
            fileName = generateUUID() + "." + file.name.split(".").pop();
            // not sure why I have to override the types here
            const Body = (await file.arrayBuffer()) as Buffer;
            s3.send(new PutObjectCommand({ Bucket, Key: fileName, Body }));
        })
    );

    return NextResponse.json({
        fileName:
            "https://diwi-fullstack-bucket.s3.us-west-1.amazonaws.com/" +
            fileName,
    });
}
