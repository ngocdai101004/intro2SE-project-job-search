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

interface IJob {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  requirements: string[];
  employmentType: string; // e.g., Full-time, Part-time
  workMode: string; // e.g., On-site, Remote
  applicantCount: number; // Số lượng ứng viên
  level: string; // e.g., Internship, Entry-level, Mid-level, Senior-level
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

  // Jobs
  jobs: IJob[];

  // Reviews
  reviews: IReview[];

  // QA
  qa: IQA[];
}

export default ICompany;
