import { mongoose, version } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const companyAdminSchema = {
  _id: ObjectId,
  companyId: { type: ObjectId, ref: "Company", required: true },
  userId: { type: ObjectId, ref: "User", required: true },
  permissions: [
    {
      type: String,
      enum: ["createJob", "editJob", "deleteJob", "manageApplications"],
    },
  ],
  addedAt: { type: Date, default: Date.now },
};

export default mongoose.model("CompanyAdmin", companyAdminSchema);
