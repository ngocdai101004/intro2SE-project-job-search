import {Request, Response} from 'express';
import ChatDB from "../models/chatModel";
import UserDB from "../models/userModel";

const getChatInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = req.body.userID;

        // Find the chat where the user exists in the "users" array
        const chats = await ChatDB.find({
            users: {$elemMatch: {$eq: userID}},
        });

        if (chats.length === 0) {
            res.status(404).json({message: "Chat not found"});
            return;
        }

        // Process each chat and populate the user data
        const chatDetails = await Promise.all(
            chats.map(async (chat) => {
                // Retrieve user details for both users in the chat
                const user1ID = chat.users[0];
                const user2ID = chat.users[1];

                // Find users by ID
                const user1 = await UserDB.findById(user1ID);
                const user2 = await UserDB.findById(user2ID);

                if (!user1 || !user2) {
                    throw new Error("One or both users not found");
                }

                // Add usernames to each message in the chat
                const updatedMessages = chat.messages.map((message) => {
                    // Attach username to each message sender
                    message.username = message.sender_id.toString() === user1ID.toString()
                        ? `${user1.first_name} ${user1.last_name}`
                        : `${user2.first_name} ${user2.last_name}`;
                    return message;
                });

                // Return updated chat details with usernames in messages
                return {
                    chatID: chat._id,
                    users: [
                        {userID: user1ID, username: `${user1.first_name} ${user1.last_name}`},
                        {userID: user2ID, username: `${user2.first_name} ${user2.last_name}`},
                    ],
                    messages: updatedMessages,
                };
            })
        );

        // Respond with the chat details
        res.status(200).json({
            message: "Chat found",
            data: chatDetails,
            sender_id: userID,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "An error occurred", error: error});
    }
};

const createChat = async (req: Request, res: Response) => {
    try {
        const userID = req.body.userID;
        const recipientID = req.body.recipientID;
        if (!userID || !recipientID) {
            res.status(400).json({message: "Missing required fields"});
        }
        await ChatDB.create({
            users: [userID, recipientID],
            messages: [],
        });

        res.status(201).json({message: "Chat created"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "An error occurred", error: error});
    }
}

const sendMessage = async (req: Request, res: Response) => {
    try {
        const userID = req.body.userID;
        const chatID = req.params.id;
        const message = req.body.message;
        if (!userID || !chatID || !message) {
            res.status(400).json({message: "Missing required fields"});
            return;
        }
        const chat = await ChatDB.findById(chatID);
        if (!chat) {
            res.status(404).json({message: "Chat not found"});
            return;
        }
        chat.messages.push({
            sender_id: userID,
            message: message,
            timestamp: new Date(),
        });
        await chat.save();
        res.status(200).json({message: "Message sent"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "An error occurred", error: error});
    }
}


export {getChatInfo, createChat, sendMessage};