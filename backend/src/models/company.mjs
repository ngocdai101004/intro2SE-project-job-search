import { mongoose, version } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const companySchema = {
  _id: ObjectId,
  name: { type: String, required: true },
  slogan: String,
  description: String,
  industry: [String],
  email: { type: String, required: true },
  phone: String,
  address: {
    street: String,
    city: String,
    country: String,
  },
  numEmployees: Number,
  followerCount: { type: Number, default: 0 },
  owner: { type: ObjectId, ref: "User", required: true },
  legalDocuments: [
    {
      type: String,
      url: String,
      verificationStatus: String,
      uploadedAt: Date,
    },
  ],
  ratings: [
    {
      userId: { type: ObjectId, ref: "User" },
      content: String,
      score: { type: Number, min: 1, max: 10 },
      createdAt: Date,
    },
  ],
  averageRating: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

export default mongoose.model("Company", companySchema);
