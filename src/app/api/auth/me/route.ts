import connectToDB from "@/configs/db";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import UserModel from "@/models/User";

export async function GET() {
  connectToDB();
  const cookie = await cookies();
  const token = await cookie.get("token")?.value;
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token);
    if (tokenPayload) {
      user = await UserModel.findOne(
        { email: tokenPayload.email },
        "-password -refreshToken -__v",
      );
    }
    return Response.json(user);
  } else {
    return Response.json(
      {
        data: null,
        message: "Not Access !!",
      },
      {
        status: 401,
      },
    );
  }
}
