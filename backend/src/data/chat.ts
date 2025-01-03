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
                message: "Hey, how's everything going?",
                date: new Date("2024-12-01T09:45:00.000Z"),
            },
            {
                sender_id: users[1]._id,
                message: "Hi! Things are going great, thanks for asking. What about you?",
                date: new Date("2024-12-01T09:46:00.000Z"),
            },
            {
                sender_id: users[0]._id,
                message: "I'm doing pretty well! Just been busy with work lately.",
                date: new Date("2024-12-01T09:47:30.000Z"),
            },
            {
                sender_id: users[2]._id,
                message: "Sounds like the usual grind. How’s the project you’re working on?",
                date: new Date("2024-12-01T09:50:00.000Z"),
            },
            {
                sender_id: users[0]._id,
                message: "It’s been tough, but I’m getting there. Need some time off soon though!",
                date: new Date("2024-12-01T09:52:00.000Z"),
            },
            {
                sender_id: users[1]._id,
                message: "Take care of yourself! I’m sure it’ll all pay off in the end.",
                date: new Date("2024-12-01T09:53:30.000Z"),
            },
            {
                sender_id: users[2]._id,
                message: "I totally agree. A little break is always helpful to refresh the mind.",
                date: new Date("2024-12-01T09:55:00.000Z"),
            },
            {
                sender_id: users[0]._id,
                message: "Definitely! Speaking of which, any fun plans for the weekend?",
                date: new Date("2024-12-01T09:58:00.000Z"),
            },
            {
                sender_id: users[1]._id,
                message: "I’m going hiking with some friends! I’m really looking forward to it.",
                date: new Date("2024-12-01T09:59:00.000Z"),
            },
            {
                sender_id: users[2]._id,
                message: "That sounds awesome! I’m planning to catch up on some reading and relax.",
                date: new Date("2024-12-01T10:00:00.000Z"),
            },
            {
                sender_id: users[0]._id,
                message: "That’s a good plan! I think I’ll do the same, just take it easy for a bit.",
                date: new Date("2024-12-01T10:02:00.000Z"),
            },
            {
                sender_id: users[1]._id,
                message: "Nice! Let’s all get some rest and recharge for the week ahead.",
                date: new Date("2024-12-01T10:04:00.000Z"),
            },
            {
                sender_id: users[2]._id,
                message: "Agreed. Alright, I’ll talk to you both later!",
                date: new Date("2024-12-01T10:05:00.000Z"),
            },
            {
                sender_id: users[0]._id,
                message: "Catch you later!",
                date: new Date("2024-12-01T10:06:00.000Z"),
            },
            {
                sender_id: users[1]._id,
                message: "Take care, guys!",
                date: new Date("2024-12-01T10:07:00.000Z"),
            },
        ]
    },
];
