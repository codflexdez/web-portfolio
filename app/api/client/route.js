import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

// Prevent static optimization to avoid prerender issues
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");
  const userId = searchParams.get("userId");
  
  try {
    // Validate required parameters
    if (!sessionId || !userId) {
      return NextResponse.json(
        { error: "Missing required parameters", message: "Both sessionId and userId are required" },
        { status: 400 }
      );
    }

    // Parse and validate IDs are valid numbers
    const parsedSessionId = parseInt(sessionId);
    const parsedUserId = parseInt(userId);

    if (isNaN(parsedSessionId) || isNaN(parsedUserId)) {
      return NextResponse.json(
        { error: "Invalid parameters", message: "sessionId and userId must be valid numbers" },
        { status: 400 }
      );
    }

    const images = await prisma.image.findMany({
      where: {
        session: {
          id: parsedSessionId,
          user_id: parsedUserId,
        },
      },
    });

    // Return empty array instead of 404 to avoid prerender issues
    if (!images || images.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
   
    return NextResponse.json(images, { status: 200 });
    
  } catch (error) {
    console.error("Error getting images:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}