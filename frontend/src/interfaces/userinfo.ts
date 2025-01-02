export interface IReview {
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
  user_id?: string;
  review?: IReview[];
  following?: string[];
  education?: IEducation[];
  experience?: IExperience[];
  skills?: string[];
  certifications?: ICertification[];
  job_preferences?: IJobPreference[];
  ready_to_work?: boolean;
  additional_info?: string;
  awards?: string[];
  languages?: string[];
  link?: string[];
  publications?: IPublication[];
  qualifications?: IQualification[];
  short_bio?: string;
  profile_picture?: string;
  resume?: string[];
  summary?: string;
}

export default IUserInfo;