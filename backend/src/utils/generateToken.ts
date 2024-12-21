import { Response } from "express";
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../interfaces/interfaces";

const generateToken = (res: Response, payload: IJwtPayload): void => {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpire = process.env.JWT_EXPIRE;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  if (!jwtExpire) {
    throw new Error("JWT_EXPIRE is not defined in environment variables");
  }

  const token = jwt.sign({ payload }, jwtSecret, {
    expiresIn: jwtExpire,
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
