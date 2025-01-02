import IUser from "./user";

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
  relocate_preference: string;
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
  userData: {
    user: IUser;
    userInfo: IUserInfo;
  };
  setUser?: React.Dispatch<React.SetStateAction<IUser>>;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>;
  isOwnProfile?: boolean;
}

export interface ICompanyReviewer {
  name: string;
  avatar: string;
  content: string;
  rating: number;
}

export default IUserInfo;
