import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

// Prevent static optimization to avoid prerender issues
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    
    // Return empty array instead of 404 when no categories exist
    if (!categories || categories.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
    
    return NextResponse.json(categories, { status: 200 });
    
  } catch (error) {
    console.error("Error getting categories:", error);
    
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}