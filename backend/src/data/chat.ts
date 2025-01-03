import {ObjectId} from "mongodb";
import {users} from "./users";

export const chats = [
    {
        _id: new ObjectId(),
        users: [users[0]._id, users[1]._id],
        messages: [
            {
                sender_id: users[0]._id,
                message: "Hello!",
                date: new Date("2024-12-01T10:00:00.000Z"),
            },
            {
                sender_id: users[1]._id,
                message: "Hi there!",
                date: new Date("2024-12-01T10:01:00.000Z"),
            },
            {
                sender_id: users[0]._id,
                message: "How are you?",
                date: new Date("2024-12-01T10:02:00.000Z"),
            },
            {
                sender_id: users[1]._id,
                message: "I'm good, thanks! How about you?",
                date: new Date("2024-12-01T10:03:00.000Z"),
            },
            {
                sender_id: users[0]._id,
                message: "I'm doing well, thank you!",
                date: new Date("2024-12-01T10:04:00.000Z"),
            },
        ],
    },
    {
        _id: new ObjectId(),
        users: [users[0]._id, users[2]._id],
        messages: [
            {
                sender_id: users[0]._id,
                message: "Hello!",
                date: new Date("2024-12-01T10:00:00.000Z"),
            },
            {
                sender_id: users[2]._id,
                message: "Hi there!",
                date: new Date("2024-12-01T10:01:00.000Z"),
            },
            {
                sender_id: users[0]._id,
                message: "How are you?",
                date: new Date("2024-12-01T10:02:00.000Z"),
            },
            {
                sender_id: users[2]._id,
                message: "I'm good, thanks! How about you?",
                date: new Date("2024-12-01T10:03:00.000Z"),
            },
            {
                sender_id: users[0]._id,
                message: "I'm doing well, thank you!",
                date: new Date("2024-12-01T10:04:00.000Z"),
            },
        ],
    },
];
