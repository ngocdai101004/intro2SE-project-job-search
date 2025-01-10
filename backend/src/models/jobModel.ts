import mongoose from "mongoose";
import { Double } from "mongodb";

const jobSchema = new mongoose.Schema(
  {
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company", // Assuming this references a Company model
    },

    status: {
      type: String,
      required: true,
      enum: ["open", "closed", "draft"],
    },

    title: {
      type: String,
      required: true,
    },

    number_of_peoples: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["full-time", "part-time", "contract", "internship"], // Example job types
    },

    location_type: {
      type: String,
      required: true,
      // Example location types
    },

    description: {
      type: String,
      required: true,
    },

    salary: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },

    emails: {
      type: String,
    },

    requirements: {
      type: [String],
    },

    benefits: {
      type: [String],
    },

    responsibilities: {
      type: [String],
    },

    open_time: {
      type: Date,
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },
    plot_embedding: {
      type: [mongoose.Types.Decimal128],
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

jobSchema.index({ title: "text", description: "text" });
// Create the model
const JobDB = mongoose.model("Job", jobSchema);

export default JobDB;
