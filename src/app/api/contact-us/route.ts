import connectToDB from "@/configs/db";
import { NextRequest } from "next/server";
import ContactModel from "@/models/Contact";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email || !phone || !company || !message) {
      return new Response("Please fill in all fields", { status: 400 });
    }

    const contact = await ContactModel.create({
      name,
      email,
      phone,
      company,
      message,
    });

    return Response.json(
      { message: "Contact created successfully :))" },
      { status: 201 },
    );
  } catch (error) {
    return new Response("Internal server error !!", { status: 500 });
  }
}
