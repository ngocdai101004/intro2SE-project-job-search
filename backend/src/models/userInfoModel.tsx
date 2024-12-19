import mongoose from "mongoose";

// Define an interface for the UserInfo document
interface IUserInfo extends mongoose.Document {
  user_id: mongoose.Schema.Types.ObjectId;

  review: {
    reviewer: mongoose.Schema.Types.ObjectId;
    content: string;
  }[];

  education: {
    education_level: string;
    study_field: string;
    school_name: string;
    month_begin: number;
    year_begin: number;
    month_end: number;
    year_end: number;
    additional_details: string;
  }[];

  experience: {
    job_title: string;
    company_name: string;
    month_begin: number;
    year_begin: number;
    month_end: number;
    year_end: number;
    description: string;
  }[];

  skills: string[];
  certifications: string[];

  job_preferences: {
    job_type: string;
    industry: string;
    relocate_preference: string;
    salary_expectation: number;
  };

  ready_to_work: boolean;

  // additional information
  additional_info: string;
  awards: string[];
  languages: {
    language: string;
    proficiency: string;
  }[];
  link: string;
  publications: {
    title: string;
    url: string;
    description: string;
  }[];
}

const UserInfo = mongoose.model<IUserInfo>("UserInfo", userInfoSchema);

export default UserInfo;
