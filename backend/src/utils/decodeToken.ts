import jwt from "jsonwebtoken";
// import { IJwtPayload } from '../interfaces/interfaces';

export const decodeToken = (token: string) => {
  if (!token || token.trim() === "") {
    throw new Error("Token is missing or empty");
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      if (error.message === "invalid signature") {
        throw new Error("Invalid token signature");
      } else if (error.message === "jwt malformed") {
        throw new Error("Malformed token");
      }
    }

    throw new Error("Invalid token");
  }
};
