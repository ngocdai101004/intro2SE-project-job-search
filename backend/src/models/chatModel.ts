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
                username: {
                    type: String,
                },
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
        timestamps: true,
    }
);

// Create the model
const ChatDB = mongoose.model("Chat", chatSchema);

export default ChatDB;
