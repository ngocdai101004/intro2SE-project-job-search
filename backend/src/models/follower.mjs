import { mongoose, version } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const followerSchema = {
  _id: ObjectId,
  applicantId: { type: ObjectId, ref: "User", required: true },
  companyId: { type: ObjectId, ref: "Company", required: true },
  followedAt: { type: Date, default: Date.now },
};

export default mongoose.model("Follower", followerSchema);
