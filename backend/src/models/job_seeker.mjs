import { Mongoose, version } from "mongoose";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

// JobSeeker Profile Schema
const jobSeekerSchema = {
  userId: { type: ObjectId, ref: "User", required: true },
  resume: String, // URL to stored resume file
  qualifications: [String],
  industry: [String],
  jobPreferences: {
    desiredSalary: {
      min: Number,
      max: Number,
    },
    jobTypes: [String],
    locations: [String],
    industries: [String],
  },
  experiences: [
    {
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      description: String,
      isCurrentJob: Boolean,
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      field: String,
      startDate: Date,
      endDate: Date,
      grade: String,
    },
  ],
  skills: [String],
  certificationsAndLicenses: [
    {
      name: String,
      issuer: String,
      issuedDate: Date,
      expiryDate: Date,
      credentialUrl: String,
    },
  ],
};

export default mongoose.model("JobSeeker", jobSeekerSchema);
