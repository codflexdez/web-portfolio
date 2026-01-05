import { readFile } from "fs/promises";
import path from "path";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imagePath = searchParams.get('imagePath');
  const imgName = searchParams.get('imageName');
  // const pathList = request.nextUrl.pathname.split("/");



const buffer = await readFile(path.join(process.cwd(), "public", imagePath));
  

  const headers = new Headers();
  headers.append("Content-Disposition", `attachment; filename=${imgName}`);
  headers.append("Content-Type", "image/png/webp/jpeg");
  console.log(buffer);
  return new Response(buffer, {
    headers,
  });
}

// clients page.js
// const handleClick = async () => {
  // try {
    //   const response = await fetch(
    //     `/api/download?imagePath=${img.img_path}&imageName=${pathName}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

      // if (response.ok) {
      //    console.log(response);
    
      /*  const blob = await response.blob();
        console.log(blob);
       
        const url = window.URL.createObjectURL(blob);
        console.log(url);
        const link = document.createElement("a");
        link.href = url;
        link.download = pathName;
        link.click();
        window.URL.revokeObjectURL(blob);*/
    //   } else {
    //     console.error(
    //       "Error downloading image. Server responded with:",
    //       response.status,
    //       response.statusText
    //     );
    //   }
    // } catch (error) {
    //   console.error("Error downloading image:", error);
    // }
// }

// server side 

/* // import { readFile } from "fs/promises";
// import path from "path";
// import { list } from "@vercel/blob";
// import { NextResponse } from "next/server";


// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const imagePath = searchParams.get("imagePath");
//   const imgName = searchParams.get("imageName");


    // try {
    //   const response = await list({
    //     token: process.env.BLOB_READ_WRITE_TOKEN
    //   });
    //   const foundBlob = response.blobs.filter(blob => blob.pathname === imgName)[0];

    //     if (foundBlob) {


    //     const headers = new Headers();
    //     headers.append('Access-Control-Allow-Methods', '*');
    //     console.log(foundBlob);
    //     return new NextResponse(foundBlob, { headers });
       
    //   } else {
    //     return new NextResponse("Blob not found", { status: 404 });
    //   }
   
    // } catch (error) {
    //   return NextResponse.error(`Error getting driver: ${error}`, {
    //     status: 500,
    //   });
    
  // }
*/