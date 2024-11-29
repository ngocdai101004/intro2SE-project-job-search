import { mongoose, version } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const jobSchema = {
  _id: ObjectId,
  companyId: { type: ObjectId, ref: "Company", required: true },
  jobTitle: { type: String, required: true },
  demand: Number,
  location: {
    city: String,
    country: String,
    isRemote: Boolean,
  },
  jobType: {
    type: String,
    enum: ["fullTime", "partTime", "contract", "internship"],
  },
  salary: {
    min: Number,
    max: Number,
    rate: String, // yearly, monthly, hourly
  },
  jobDescription: String,
  requirements: [String],
  benefits: [String],
  customQuestions: [
    {
      question: String,
      required: Boolean,
      type: String, // text, multipleChoice, etc
    },
  ],
  deadline: Date,
  status: {
    type: String,
    enum: ["draft", "active", "closed", "expired"],
    default: "draft",
  },
  numApplicants: { type: Number, default: 0 },
  numAwaiting: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

export default mongoose.model("Job", jobSchema);
