import exp from "constants";
import e, { Request } from "express";

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

export interface IGetUserProfileRequest extends Request {
  body: {
    userID: string;
  };
}

export interface IJob {
  company_id: string;
  status: "open" | "closed" | "draft";
  title: string;
  number_of_peoples: number;
  type: "full-time" | "part-time" | "contract" | "internship";
  location_type: "remote" | "on-site" | "hybrid";
  description: string;
  salary: number;
  emails?: string;
  requirements?: string[];
  deadline: Date;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICompany {
  owner_id: string;
  admin_id: string[];
  company_name: string;
  address: {
    district: string;
    city_state: string;
    zip_code: string;
    country: string;
  };
  description: {
    company_size: number[];
    industry: string;
    headquarters: string;
    links?: string[];
    founded: Date;
    specialities?: string[];
  };
  short_description: string;
  number_of_employees: number;
  number_of_followers?: number;
  legal_document_url?: string;
  reviews: {
    user_id: string;
    rating: 1 | 2 | 3 | 4 | 5;
    review?: string;
  }[];
  followers: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IVerifyAdminRequest extends IVerifiedRequest {
  body: IVerifiedRequest["body"] & {
    company_id: string;
    isAdmin: boolean;
  };
}
