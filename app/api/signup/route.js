import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

// Prevent static optimization to avoid prerender issues
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const privileges = await prisma.privilege.findMany();

    if (!privileges || privileges.length === 0) {
      return NextResponse.json(
        { message: "No privilege found" },
        { status: 404 }
      );
    }

    return NextResponse.json(privileges, { status: 200 });
  } catch (error) {
    console.error(error);
    
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}