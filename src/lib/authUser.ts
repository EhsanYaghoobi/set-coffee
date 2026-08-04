import { cookies } from "next/headers";
import UserModel from "@/models/User";
import { verifyAccessToken } from "@/utils/auth";

const authUser = async () => {
  const cookie = await cookies();
  const token = await cookie.get("token")?.value;
  let user = null;
  if (token) {
    const tokenPayload = verifyAccessToken(token);
    if (tokenPayload) {
      user = await UserModel.findOne({ email: tokenPayload.email });
    }
  }
  return user;
};

export { authUser };
