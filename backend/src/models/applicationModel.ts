import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
const ApplicationDB = mongoose.model("Application", applicationSchema);

export default ApplicationDB;
