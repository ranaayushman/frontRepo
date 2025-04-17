import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/app/models/contact.model";

// Connect to the database before handling requests
await connectDB();

// GET all contacts
export async function GET() {
  try {
    const contacts = await Contact.find();
    return NextResponse.json(contacts, { status: 200 });
  } catch (err) {
    console.error("Error fetching contacts:", (err as Error).message);
    return new NextResponse("Server error", { status: 500 });
  }
}



// POST a new contact
export async function POST(req: Request) {
  try {
    const { name, email, phoneNumber, subject, address } = await req.json();

    const newContact = new Contact({
      name,
      email,
      phoneNumber,
      subject,
      address,
    });

    await newContact.save();
    return NextResponse.json(newContact, { status: 201 });
  } catch (err) {
    console.error("Error posting new contact:", (err as Error).message);
    return new NextResponse("Server error", { status: 500 });
  }
}
