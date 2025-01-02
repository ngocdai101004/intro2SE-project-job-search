export interface IUser {
  userID: string;
  username: string;
  email: string;
  password: string;
  is_verified: boolean;
  verification_code: string;
  createdAt: string;
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

export interface IReview {
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
  salary: number;
  emails?: string;
  requirements?: string[];
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

export default ICompany;
