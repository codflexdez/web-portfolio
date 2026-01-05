import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");
  const userId = searchParams.get("userId");

  console.log(sessionId);

  try {
    const images = await prisma.image.findMany({
      where: {
        session: {
          id: parseInt(sessionId),
          user_id: parseInt(userId),
        },
      },
    });

    if (!images || images.length === 0) {
      return new NextResponse.JSON(
        { message: "There is no photo session available yet!" },
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(images), { status: 200 });
  } catch (error) {
    return NextResponse.error(`Error getting driver: ${error}`, {
      status: 500,
    });
  }
}
