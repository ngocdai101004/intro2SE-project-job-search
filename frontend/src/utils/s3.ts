import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import IFile from "../interfaces/file";

function generateRandomString(length: number): string {
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result: string = "";

  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

const randomString: string = generateRandomString(24);
console.log(randomString);

// connect to digitalocean spaces
const s3 = new S3Client({
  endpoint: `https://${import.meta.env.VITE_S3_ENDPOINT}`, // e.g., "https://nyc3.digitaloceanspaces.com"
  forcePathStyle: false, // Use subdomain-style URL
  region: "nyc3", // Ensure this matches your space region
  credentials: {
    accessKeyId: import.meta.env.VITE_S3_KEY as string,
    secretAccessKey: import.meta.env.VITE_S3_SECRET as string,
  },
});

// upload to digitalocean spaces
async function uploadFile(location: string, file: IFile): Promise<string> {
  const key = `${location ? `${location}/` : ""}${generateRandomString(24)}${
    file.filename
  }`;
  console.log("key");
  console.log(key);

  const command = new PutObjectCommand({
    Key: key,
    Body: file.buffer,
    Bucket: import.meta.env.VITE_S3_BUCKET as string,
    ACL: "public-read",
    ContentType: file.mimetype,
  });
  await s3.send(command);
  const url = `https://${import.meta.env.VITE_S3_BUCKET as string}.${
    import.meta.env.VITE_S3_ENDPOINT as string
  }/${encodeURIComponent(key)}`;

  console.log("url");
  console.log(url);
  return url;
}

export { uploadFile };
