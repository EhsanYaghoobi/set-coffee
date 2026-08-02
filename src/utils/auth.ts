import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

interface TokenPayload {
  email: string;
}

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const verifyPassword = async (Password: string, hashedPassword: string): Promise<boolean> => {
  const isValid = await compare(Password, hashedPassword);
  return isValid;
};

const generateAccessToken = (data: TokenPayload): string => {
    if (!process.env.AccessTokenSecretKey) {
        throw new Error("AccessTokenSecretKey is not defined !!");
    }
  const token = sign({ ...data }, process.env.AccessTokenSecretKey, {
    expiresIn: "60s",
  });
  return token;
};

const verifyAccessToken = (token: string) => {
  try {
    if (!process.env.AccessTokenSecretKey) {
        throw new Error("AccessTokenSecretKey is not defined !!");
    }
    const tokenPayload = verify(token, process.env.AccessTokenSecretKey);
    return tokenPayload;
  } catch (err) {
    console.log("Verify Access Token Error:", err);
    return false;
  }
};
const generateRefreshToken = (data: TokenPayload): string => {
  if (!process.env.RefreshTokenSecretKey) {
    throw new Error("RefreshTokenSecretKey is not defined !!");
  } 
  const token = sign({ ...data }, process.env.RefreshTokenSecretKey, {
    expiresIn: "15d",
  });
  return token;
};

export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
};
