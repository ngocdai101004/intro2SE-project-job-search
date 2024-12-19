import mongoose from "mongoose";

interface IApplicantInfo extends mongoose.Document {
    job_id: mongoose.Schema.Types.ObjectId;
    user_id: mongoose.Schema.Types.ObjectId;
    resume_url: string;
    status: string;
    feedback: string;
}