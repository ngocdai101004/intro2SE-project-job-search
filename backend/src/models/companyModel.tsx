import mongoose from "mongoose";

interface ICompanyInfo extends mongoose.Document {
    owner_id: mongoose.Schema.Types.ObjectId;
    admin_id: mongoose.Schema.Types.ObjectId[];
    company_name: string;
    description: string;
    short_description: string;
    number_of_employees: number;
    number_of_followers: number;
    legal_documents: string;

    reviews: {
        user_id: mongoose.Schema.Types.ObjectId;
        rating: number;
        review: string;
    }

    jobs: {
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

        applicants: {
            user_id: mongoose.Schema.Types.ObjectId;
            resume: string;
            status: string;
        }[];
    }[];
}