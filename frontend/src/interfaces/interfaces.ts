export interface IUser {
  userID: string;
  username: string;
  email: string;
  password: string;
  is_verified: boolean;
  verification_code: string;
  createdAt: string;
}

export interface IReview {
  user_id?: string;
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
