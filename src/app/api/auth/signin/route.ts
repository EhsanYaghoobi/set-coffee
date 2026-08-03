import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePassword,
  verifyPassword,
} from "@/utils/auth";
import { NextRequest } from "next/server";
import UserModel from "@/models/User";
import connectToDB from "@/configs/db";

export async function POST(req: NextRequest) {
  try {
    connectToDB();
    const body = await req.json();
    const { email, password } = body;

    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    if (!isValidEmail || !isValidPassword) {
      return Response.json(
        { message: "email or password is not valid !!" },
        { status: 419 },
      );
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return Response.json({ message: "User not found !!" }, { status: 422 });
    }

    const isCorrectPasswordWithHash = verifyPassword(password, user.password);
    if (!isCorrectPasswordWithHash) {
      return Response.json(
        { message: "Email or Password is not correct !!" },
        { status: 401 },
      );
    }

    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    await UserModel.findOneAndUpdate(
      { email },
      {
        $set: { refreshToken },
      },
    );

    return Response.json(
      {
        message: "User Signed in successfully :))",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${accessToken};path=/;httpOnly=true`,
        },
      },
    );
  } catch (err) {
    console.log("err -> ", err);
    return Response.json(
      { message: "Internal Server Error !!" },
      { status: 500 },
    );
  }
}
