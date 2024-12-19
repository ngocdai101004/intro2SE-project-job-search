import mongoose from "mongoose";

interface ICompanyInfo extends mongoose.Document {
    owner_id: mongoose.Schema.Types.ObjectId;
    admin_id: mongoose.Schema.Types.ObjectId[];
    company_name: string;
    description: string;
    short_description: string;
    number_of_employees: number;
    number_of_followers: number;
    legal_document_url: string;

    reviews: {
        user_id: mongoose.Schema.Types.ObjectId;
        rating: number;
        review: string;
    }[];
}