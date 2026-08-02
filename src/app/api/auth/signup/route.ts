import { NextRequest } from "next/server";
import connectToDB from "@/configs/db";

export async function GET(req: NextRequest) {
  connectToDB();

  return Response.json(
    { message: "success Response :))" },
    {
      status: 201,
    },
  );
}
