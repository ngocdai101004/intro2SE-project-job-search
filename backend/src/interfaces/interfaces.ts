import exp from "constants";
import e, { Request } from "express";

export interface IUser {
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  is_verified: boolean;
  verification_code?: string;
  phone?: string;
  address?: {
    district?: string;
    city_state?: string;
    zip_code?: string;
    country?: string;
  };
  gender?: "male" | "female";
  date_of_birth?: Date;
  avatar?: string;
  short_bio: string;
  createdAt?: string;
  updatedAt?: string;
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

interface Address {
  district: string;
  city_state: string;
  zip_code: string;
  country: string;
}

interface Description {
  company_size: number[];
  industry: string;
  headquarters: string;
  links: string[];
  founded: Date;
  specialities: string[];
}

interface IReview {
  user_id: string;
  rating: number;
  review: string;
  date: Date;
}

export interface IJob {
  _id: string;
  company_id: string;
  status: "open" | "closed" | "draft";
  title: string;
  number_of_peoples: number;
  type: "full-time" | "part-time" | "contract" | "internship";
  location_type: "remote" | "on-site" | "hybrid";
  description: string;
  salary: {
    min: number;
    max: number;
  };
  emails?: string;
  requirements?: string[];
  benefits?: string[];
  responsibilities?: string[];
  open_time: Date;
  deadline: Date;
  createdAt?: string;
  updatedAt?: string;
}

interface IQA {
  question: string;
  answer: string;
}

interface ICompany {
  _id?: string;
  owner_id?: string;
  admin_id?: string[];

  // Header
  company_name: string;
  sumRating: number;
  applicant?: string[];
  employees?: string[];
  followers?: string[];

  // Snapshot
  address?: Address;
  description: Description;
  short_description: string;
  legal_document_url?: string;

  // Reviews
  reviews: IReview[];

  // QA
  qa: IQA[];
}

export interface IVerifyAdminRequest extends IVerifiedRequest {
  body: IVerifiedRequest["body"] & {
    company_id: string;
    isAdmin: boolean;
  };
}

export interface IReviewByCompany {
  reviewer: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface IEducation {
  education_level: string;
  study_field: string;
  school_name: string;
  begin: Date;
  end?: Date;
  additional_details?: string;
}

export interface IExperience {
  job_title: string;
  company_name: string;
  begin: Date;
  end?: Date;
  description?: string;
}

export interface ICertification {
  name: string;
  issuing_organization: string;
  issue_date: Date;
}

export interface IJobPreference {
  job_title: string;
  industry: string;
  relocate_preference?: "willing" | "not_willing" | "remote_only" | "flexible";
  salary_expectation?: number;
}

export interface IPublication {
  title: string;
  url?: string;
  description?: string;
}

export interface IQualification {
  title: string;
  description?: string;
}

export interface IUserInfo {
  user_id: string;
  review: IReviewByCompany[];
  following: string[];
  education: IEducation[];
  experience: IExperience[];
  skills: string[];
  certifications: ICertification[];
  job_preferences: IJobPreference[];
  ready_to_work: boolean;
  additional_info?: string;
  awards?: string[];
  languages?: string[];
  link?: string[];
  publications: IPublication[];
  qualifications: IQualification[];
  profile_picture?: string;
  resume?: string[];
  summary?: string;
}
