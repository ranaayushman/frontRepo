import { NextResponse } from "next/server";
import Apply from "@/app/models/apply.model";
import { connectDB } from "@/lib/db";

// POST - Create new application
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      // userId,
      name,
      guardianNumber,
      email,
      phoneNumber,
      branch,
      class12marks,
      address,
      passingYear,
      lateralEntry,
      state,
      city,
      pinCode,
    } = body;

    // Ensure lateralEntry is stored as a boolean
    const newApplication = new Apply({
      // userId: userId || undefined,
      name,
      guardianNumber,
      email,
      phoneNumber,
      branch,
      class12marks,
      address,
      passingYear,
      lateralEntry: Boolean(lateralEntry), // Convert to boolean explicitly
      state,
      city,
      pinCode,
    });

    await newApplication.save();

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        data: {
          id: newApplication._id,
          ...newApplication.toJSON(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

// GET - Fetch all applications (for admin)
export async function GET() {
  try {
    await connectDB();

    const applications = await Apply.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: applications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
