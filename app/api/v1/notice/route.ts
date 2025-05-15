import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notices from "@/app/models/notice.model";
import User from "@/app/models/user.model";
import jwt from "jsonwebtoken";

// Middleware to verify JWT and extract user (returns null if no valid token)
const verifyToken = (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null; // No token provided
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
    return null; // Invalid token
  }
};

// GET - Fetch notices (all for admins, only published for public/non-admins)
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Check if user is admin
    const user = verifyToken(req);
    let notices;

    if (user && user.role === "admin") {
      // Validate user exists for admin
      const adminUser = await User.findById(user.userId);
      if (!adminUser) {
        return NextResponse.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );
      }
      // Fetch all notices for admin
      notices = await Notices.find({}).sort({ createdAt: -1 });
    } else {
      // Fetch only published notices for public/non-admin
      notices = await Notices.find({ isPublished: true }).sort({
        createdAt: -1,
      });
    }

    // Check for duplicate _id values (for robustness)
    const noticeIds = notices.map((notice) => notice._id.toString());
    const uniqueNoticeIds = new Set(noticeIds);
    if (noticeIds.length !== uniqueNoticeIds.size) {
      console.warn("Duplicate notice IDs detected:", noticeIds);
      // Remove duplicates by converting to Map and back to array
      notices = Array.from(
        new Map(
          notices.map((notice) => [notice._id.toString(), notice])
        ).values()
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: notices,
        message: "Notices fetched successfully",
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error fetching notices:", e);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// POST - Create a new notice (admin only, isPublished defaults to false)
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Verify token and check admin role
    const user = verifyToken(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }
    if (user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    // Validate user exists
    const adminUser = await User.findById(user.userId);
    if (!adminUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { title, description, isPublished } = body;

    // Input validation
    if (
      !title ||
      !description ||
      typeof title !== "string" ||
      typeof description !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and description are required and must be strings",
        },
        { status: 400 }
      );
    }
    if (isPublished !== undefined && typeof isPublished !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          message: "isPublished must be a boolean if provided",
        },
        { status: 400 }
      );
    }

    const notice = await Notices.create({
      title: title.trim(),
      description: description.trim(),
      isPublished: isPublished ?? false,
      date: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        data: notice,
        message: "Notice created successfully",
      },
      { status: 201 }
    );
  } catch (e: any) {
    console.error("Error creating notice:", e);
    return NextResponse.json(
      {
        success: false,
        message: e.message.includes("Unauthorized")
          ? e.message
          : "Internal server error",
      },
      { status: e.message.includes("Unauthorized") ? 401 : 500 }
    );
  }
}

// PUT - Update a notice (admin only, including isPublished)
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    // Verify token and check admin role
    const user = verifyToken(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }
    if (user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    // Validate user exists
    const adminUser = await User.findById(user.userId);
    if (!adminUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { id, title, description, isPublished } = body;

    // Input validation
    if (!id || typeof id !== "string" || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json(
        { success: false, message: "Valid notice ID is required" },
        { status: 400 }
      );
    }
    if (
      !title ||
      !description ||
      typeof title !== "string" ||
      typeof description !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and description are required and must be strings",
        },
        { status: 400 }
      );
    }
    if (isPublished === undefined || typeof isPublished !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          message: "isPublished is required and must be a boolean",
        },
        { status: 400 }
      );
    }

    const notice = await Notices.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description.trim(),
        isPublished,
        date: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!notice) {
      return NextResponse.json(
        { success: false, message: "Notice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: notice,
        message: "Notice updated successfully",
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("Error updating notice:", e);
    return NextResponse.json(
      {
        success: false,
        message: e.message.includes("Unauthorized")
          ? e.message
          : "Internal server error",
      },
      { status: e.message.includes("Unauthorized") ? 401 : 500 }
    );
  }
}

// DELETE - Delete a notice (admin only)
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    // Verify token and check admin role
    const user = verifyToken(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }
    if (user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    // Validate user exists
    const adminUser = await User.findById(user.userId);
    if (!adminUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { id } = body;

    // Input validation
    if (!id || typeof id !== "string" || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json(
        { success: false, message: "Valid notice ID is required" },
        { status: 400 }
      );
    }

    const notice = await Notices.findByIdAndDelete(id);

    if (!notice) {
      return NextResponse.json(
        { success: false, message: "Notice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Notice deleted successfully",
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("Error deleting notice:", e);
    return NextResponse.json(
      {
        success: false,
        message: e.message.includes("Unauthorized")
          ? e.message
          : "Internal server error",
      },
      { status: e.message.includes("Unauthorized") ? 401 : 500 }
    );
  }
}
