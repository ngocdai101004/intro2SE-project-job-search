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
  open_time: Date;
  createdAt?: Date; // Added by timestamps option
  updatedAt?: Date; // Added by timestamps option
}

export interface IJobCard extends IJob {
  company_name: string;
  company_avatar: string;
}
