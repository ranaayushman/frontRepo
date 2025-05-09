import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Apply from "@/app/models/apply.model";

export async function GET(request, { params }) {
  try {
    const userId = params.userId;

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