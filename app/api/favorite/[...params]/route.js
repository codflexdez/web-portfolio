import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

// Prevent static optimization to avoid prerender issues
export const dynamic = 'force-dynamic';


export async function GET(request) {
  const path = request.nextUrl.pathname.split("/");
  const userId = path[path.length - 1];

  try {
    const favoritedImages = await prisma.favorite.findMany({
      where: {
        user_id: +userId,
      },
      select: {
        image_id: true,
      },
    });

    return NextResponse.json(
      favoritedImages.map((item) => item.image_id),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching favorited images:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const path = request.nextUrl.pathname.split("/");
  const imgId = path[path.length - 2];
  const userId = path[path.length - 1];

  try {
    await prisma.favorite.create({
      data: {
        image_id: +imgId,
        user_id: +userId,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error creating favorite:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const path = request.nextUrl.pathname.split("/");
  const imgId = path[path.length - 2];

  try {
    await prisma.favorite.deleteMany({
      where: {
        image_id: +imgId,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
