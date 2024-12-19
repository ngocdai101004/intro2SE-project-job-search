import mongoose from "mongoose";

const applicationInfoSchema = new mongoose.Schema(
  {
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // Assuming this references a Job model
      required: true,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming this references a User model
      required: true,
    },

    resume_url: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: [
        "applied",
        "reviewing",
        "interview",
        "hired",
        "rejected",
        "shortlist",
      ], // Example statuses
      default: "applied",
    },

    feedback: {
      type: String,
      default: "", // Optional feedback field
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model
const ApplicantionInfo = mongoose.model(
  "ApplicationInfo",
  applicationInfoSchema
);

export default ApplicantionInfo;
