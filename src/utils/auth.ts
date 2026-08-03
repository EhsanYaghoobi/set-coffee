import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

interface TokenPayload {
  name?: string;
  email?: string;
}

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const verifyPassword = async (
  Password: string,
  hashedPassword: string,
): Promise<boolean> => {
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

const validateEmail = (email: string) => {
  const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
  return pattern.test(email);
};

const validatePhone = (phone: string) => {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
  return pattern.test(phone);
};

const validatePassword = (password: string) => {
  const pattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
  return pattern.test(password);
};

export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePhone,
  validatePassword,
};
