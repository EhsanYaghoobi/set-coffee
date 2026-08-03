import { NextRequest } from "next/server";
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { generateAccessToken, hashPassword } from "@/utils/auth";
import { roles } from "@/utils/constants";

export async function POST(req: NextRequest) {
  connectToDB();
  const body = await req.json();
  const { name, phone, email, password } = body;

  if (!name.trim() || !phone.trim() || !password.trim()) {
    return Response.json(
      { message: "information is not valid !" },
      {
        status: 422,
      },
    );
  }

  const isUserExist = await UserModel.findOne({
    $or: [{ name }, { email }, { phone }],
  });

  if (isUserExist) {
    return Response.json(
      { message: "User already exists" },
      {
        status: 422,
      },
    );
  }

  const hashedPassword = await hashPassword(password);
  const accessToken = generateAccessToken({ name });

  const users = await UserModel.find({});

  await UserModel.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: users.length > 0 ? roles.USER : roles.ADMIN,
  });

  return Response.json(
    { message: "User Signed up successfully :))" },
    {
      status: 201,
      headers: {
        "Set-Cookie": `token=${accessToken};path=/;httpOnly=true`,
      },
    },
  );
}
