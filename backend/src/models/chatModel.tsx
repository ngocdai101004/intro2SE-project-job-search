import mongoose from "mongoose";

interface IChatInfo extends mongoose.Document {
    users: mongoose.Schema.Types.ObjectId[];

    messages: {
        user_id: mongoose.Schema.Types.ObjectId;
        message: string;
        date: Date;
    }[]
}