import { Request } from "express";

export interface IUser {
  userID: string;
  username: string;
  email: string;
  password: string;
  is_verified: boolean;
  verification_code: string;
  createdAt: string;
}

export interface IJwtPayload {
  userID: string;
  isVerified: boolean;
}

// IVerifiedRequest replacement
export interface IVerifiedRequest extends Request {
  body: {
    userID: string;
    isVerified: boolean;
  };
}

export interface ILoginRequest extends Request {
  body: {
    email: string;
    password: string;
    // tuan: string;
  };
}

export interface IRegisterRequest extends Request {
  body: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };
}

export interface IVerifyAccountRequest extends IVerifiedRequest {
  body: IVerifiedRequest["body"] & {
    code: string;
  };
}

export interface IGetVerifyCodeRequest extends Request {
  body: {
    email: string;
  };
}

export interface IResetPasswordRequest extends Request {
  body: {
    email: string;
    password: string;
    code: string;
  };
}
