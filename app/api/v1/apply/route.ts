import { NextResponse } from "next/server";
import  Apply  from "@/app/models/apply.model";
import { connectDB } from "@/lib/db";

await connectDB();

// GET all applications
export async function GET() {
  try {
    const applications = await Apply.find();
    return NextResponse.json(applications, { status: 200 });
  } catch (err) {
    console.error("Error fetching applications:", (err as Error).message);
    return new NextResponse("Server error", { status: 500 });
  }
}
// POST a new application
export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phoneNumber,
      branch,
      aadharCardURL,
      class12MarkSheetURL,
      address,
    } = await req.json();

    const newApplication = new Apply({
      name,
      email,
      phoneNumber,
      branch,
      aadharCardURL,
      class12MarkSheetURL,
      address,
    });

    await newApplication.save();
    return NextResponse.json(newApplication, { status: 201 });
  } catch (err) {
    console.error("Error posting new application:", (err as Error).message);
    return new NextResponse("Server error", { status: 500 });
  }
}
