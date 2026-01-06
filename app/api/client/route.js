import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");
  const userId = searchParams.get("userId");


  console.log(sessionId);
  

  try {
  

    if (!sessionId || !userId) {
      return NextResponse.json(
        { message: "Missing sessionId or userId" },
        { status: 400 }
      );
    }

    const images = await prisma.image.findMany({
      where: {
        session: {
          id: parseInt(sessionId),
          user_id: parseInt(userId),
        },
      },
    });

    if (!images || images.length === 0) {
      return NextResponse.json(
        { message: "There is no photo session available yet!" },
        { status: 404 }
      );
    }

   
    return NextResponse.json(images, { status: 200 });
    
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error getting images", details: error.message },
      { status: 500 }
    );
  }
}