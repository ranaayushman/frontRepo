import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import Apply from "@/app/models/apply.model";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.id !== params.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const userApplications = await Apply.find({ userId: params.userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        data: userApplications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user applications:", error);
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
