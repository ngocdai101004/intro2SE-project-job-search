import { mongoose, version } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
// Job Application Schema
const applicationSchema = {
  _id: ObjectId,
  jobId: { type: ObjectId, ref: "Job", required: true },
  applicantId: { type: ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: [
      "pending",
      "reviewing",
      "shortlisted",
      "interviewing",
      "rejected",
      "accepted",
    ],
    default: "pending",
  },
  customAnswers: [
    {
      questionId: ObjectId,
      answer: String,
    },
  ],
  recruiterNotes: String,
  rejectionFeedback: String,
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

export default mongoose.model("Application", applicationSchema);
