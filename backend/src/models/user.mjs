import { mongoose, version } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const userSchema = {
  _id: ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: String,
  birthDate: Date,
  gender: String,
  description: String,
  avatar: String,
  address: {
    street: String,
    city: String,
    country: String,
  },
  role: {
    type: String,
    enum: ["jobSeeker", "recruiter", "admin"],
    required: true,
  },
  // Verification fields
  isVerified: { type: Boolean, default: false },
  verificationCode: String,
  verificationExpires: Date,
  refreshToken: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

export default mongoose.model("User", userSchema);
