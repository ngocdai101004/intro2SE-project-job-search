import mongoose from "mongoose";

interface IJobInfo extends mongoose.Document {
    company_id: mongoose.Schema.Types.ObjectId;

    status: string;
    title: string;
    number_of_peoples: number;
    type: string;
    location_type: string;
    zip_code: string;

    description: string;
    location: string;
    salary: number;
    emails: string;

    requirements: string[];
    deadline: Date;
}