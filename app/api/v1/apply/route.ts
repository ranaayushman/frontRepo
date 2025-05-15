import { NextResponse } from "next/server";
import Apply from "@/app/models/apply.model";
import User from "@/app/models/user.model"; // Adjust path to your User model
import { connectDB } from "@/lib/db";
import jwt from "jsonwebtoken";

// Middleware to verify JWT and extract user
const verifyToken = (req: Request) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: No token provided");
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as {
      userId: string;
      role: string;
    };
    return decoded;
  } catch (error) {
    throw new Error("Unauthorized: Invalid token");
  }
};

// POST - Create new application
export async function POST(req: Request) {
  try {
    await connectDB();

    // Verify token and get user
    const { userId, role } = verifyToken(req);

    const body = await req.json();
    const {
      collegeId,
      branchId,
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

    // Validate userId (ensure it matches token)
    // Note: Frontend sends userId, but we use token's userId for security
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Create new application
    const newApplication = new Apply({
      userId, // Use token's userId
      name,
      collegeId,
      branchId,
      guardianNumber,
      email,
      phoneNumber,
      branch,
      class12marks,
      address,
      passingYear,
      lateralEntry: Boolean(lateralEntry),
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
      {
        status:
          error instanceof Error && error.message.includes("Unauthorized")
            ? 401
            : 500,
      }
    );
  }
}

// GET - Fetch all applications (admin only)
export async function GET(req: Request) {
  try {
    await connectDB();

    // Verify token and check role
    const { userId, role } = verifyToken(req);
    if (role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

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
      {
        status:
          error instanceof Error && error.message.includes("Unauthorized")
            ? 401
            : 500,
      }
    );
  }
}

// DELETE - Delete an application
export async function DELETE(req: Request) {
  try {
    await connectDB();

    // Verify token (optional: restrict to admin or application owner)
    const { userId, role } = verifyToken(req);

    const body = await req.json();
    const { id }: { id: string } = body;

    // Validate input
    if (!id || typeof id !== "string" || !id.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Application ID is required and must be a non-empty string",
        },
        { status: 400 }
      );
    }

    // Optional: Restrict deletion to admins or application owner
    const application = await Apply.findById(id);
    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }
    if (role !== "admin" && application.userId.toString() !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden: Cannot delete this application",
        },
        { status: 403 }
      );
    }

    await Apply.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Application deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      {
        status:
          error instanceof Error && error.message.includes("Unauthorized")
            ? 401
            : 500,
      }
    );
  }
}
