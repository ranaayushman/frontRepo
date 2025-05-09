import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Colleges from "@/app/models/colleges.model";

// Interface for request body validation
interface CollegeBody {
  name: string;
  branches: { name: string }[];
}

// POST: Create a new college
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body: CollegeBody = await req.json();

    // Validate input
    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "College name is required and must be a non-empty string",
        },
        { status: 400 }
      );
    }

    if (
      !Array.isArray(body.branches) ||
      body.branches.some(
        (branch) =>
          !branch.name || typeof branch.name !== "string" || !branch.name.trim()
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Branches must be an array of objects with non-empty name strings",
        },
        { status: 400 }
      );
    }

    const newCollege = new Colleges({
      name: body.name,
      branches: body.branches,
    });
    await newCollege.save();

    return NextResponse.json(
      {
        success: true,
        data: newCollege,
        message: "College added successfully",
      },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        success: false,
        message: e instanceof Error ? e.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

// GET: Fetch all colleges
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const colleges = await Colleges.find();

    return NextResponse.json(
      {
        success: true,
        data: colleges,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        success: false,
        message: e instanceof Error ? e.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

// PUT: Update a college by ID
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      id,
      name,
      branches,
    }: { id: string; name?: string; branches?: { name: string }[] } = body;

    // Validate input
    if (!id || typeof id !== "string" || !id.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "College ID is required and must be a non-empty string",
        },
        { status: 400 }
      );
    }

    if (name && (typeof name !== "string" || !name.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "College name must be a non-empty string if provided",
        },
        { status: 400 }
      );
    }

    if (
      branches &&
      (!Array.isArray(branches) ||
        branches.some(
          (branch) =>
            !branch.name ||
            typeof branch.name !== "string" ||
            !branch.name.trim()
        ))
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Branches must be an array of objects with non-empty name strings if provided",
        },
        { status: 400 }
      );
    }

    const updateData: Partial<CollegeBody> = {};
    if (name) updateData.name = name;
    if (branches) updateData.branches = branches;

    const updatedCollege = await Colleges.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCollege) {
      return NextResponse.json(
        {
          success: false,
          message: "College not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedCollege,
        message: "College updated successfully",
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        success: false,
        message: e instanceof Error ? e.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

// DELETE: Delete a college by ID
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { id }: { id: string } = body;

    // Validate input
    if (!id || typeof id !== "string" || !id.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "College ID is required and must be a non-empty string",
        },
        { status: 400 }
      );
    }

    const deletedCollege = await Colleges.findByIdAndDelete(id);

    if (!deletedCollege) {
      return NextResponse.json(
        {
          success: false,
          message: "College not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: deletedCollege,
        message: "College deleted successfully",
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        success: false,
        message: e instanceof Error ? e.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
