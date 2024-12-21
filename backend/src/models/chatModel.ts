import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming this references a User model
        required: true,
      },
    ],

    messages: [
      {
        sender_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Assuming this references a User model
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model
const ChatDB = mongoose.model("Chat", chatSchema);

export default ChatDB;
