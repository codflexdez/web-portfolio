import { readFile } from "fs/promises";
import path from "path";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imagePath = searchParams.get('imagePath');
  const imgName = searchParams.get('imageName');


const buffer = await readFile(path.join(process.cwd(), "public", imagePath));
  

  const headers = new Headers();
  headers.append("Content-Disposition", `attachment; filename=${imgName}`);
  headers.append("Content-Type", "image/png/webp/jpeg");
  console.log(buffer);
  return new Response(buffer, {
    headers,
  });
}

