import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const photoSession = await prisma.session.findMany({
      include: {
        image: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!photoSession || photoSession.length === 0) {
      return NextResponse.json(
        { message: "There is no photo session available yet!" },
        { status: 404 }
      );
    }

    return NextResponse.json(photoSession, { status: 200 });
    
  } catch (error) {
    console.error("Fetch error:", error);
    
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
