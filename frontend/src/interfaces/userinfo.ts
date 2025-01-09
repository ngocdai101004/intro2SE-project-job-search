export interface IReview {
  reviewer: string; // Assuming this is a user ID
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

export interface IJobPreference {
  job_title: string;
  industry: string;
  relocate_preference: "willing" | "not_willing" | "remote_only" | "flexible";
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

export interface ICertification {
  name: string;
  issuing_organization: string;
  issue_date: Date;
}

export interface IUserInfo {
  user_id: string; // Required
  review?: IReview[];
  following?: string[]; // Assuming these are company IDs
  education?: IEducation[];
  experience?: IExperience[];
  skills?: string[];
  certifications?: ICertification[];
  job_preferences?: IJobPreference[];
  ready_to_work: boolean; // Required
  additional_info?: string;
  awards?: string[];
  languages?: string[];
  link?: string[];
  publications?: IPublication[];
  qualifications?: IQualification[];
  profile_picture?: string;
  resume?: string[];
  summary?: string;
}

export interface UserProfileProps {
  userID?: string | null;
}

export interface JobSearchCVProps {
  userID?: string | null;
}

export interface ICompanyReviewer {
  name: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface ResumeData {
  summary: string;
  education: IEducation[];
  qualifications: IQualification[];
  skills: string[];
  experience: IExperience[];
  certifications: ICertification[];
  job_preferences: IJobPreference[];
  ready_to_work: boolean;
  resume: string[];
}

export interface BuildJobSearhCVProps {
  data: ResumeData;
  setData: (data: ResumeData) => void;
}

export default IUserInfo;
