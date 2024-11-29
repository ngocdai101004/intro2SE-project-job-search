import { mongoose, version } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const messageSchema = {
  _id: ObjectId,
  senderId: { type: ObjectId, ref: "User", required: true },
  receiverId: { type: ObjectId, ref: "User", required: true },
  content: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
};

export default mongoose.model("Message", messageSchema);
