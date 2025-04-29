import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Apply from "@/app/models/apply.model";

// Convert to JavaScript file (.js extension) to avoid TypeScript issues
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const userId = params.userId;

    if (!session?.user?.id || session.user.id !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const userApplications = await Apply.find({ userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: userApplications,
    });
  } catch (error) {
    console.error("Error fetching user applications:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}