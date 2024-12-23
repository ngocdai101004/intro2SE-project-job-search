import { Request, Response } from "express";
import UserInfoDB from "../models/userInfoModel";


const updateUserInfo = async (req: Request, res: Response) => {
    try {
        const { userID, updateFields } = req.body;

        // Check if the user exists
        let user = await UserInfoDB.findOne({ user_id: userID });

        if (!user) {
            // If the user does not exist, create a new record
            user = await UserInfoDB.create({ user_id: userID });
        }

        // Update the fields (only the ones provided in updateFields)
        Object.keys(updateFields).forEach((key) => {
            // Type assertion to ensure TypeScript understands the dynamic indexing
            (user as any)[key] = updateFields[key];
        });

        // Save the updated document
        const updatedUser = await user.save();

        // Respond with the updated user info
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user info:", error);
        res.status(500).json({ error: "An error occurred while updating user info." });
    }
};

export default updateUserInfo;

const getUserInfo = async (req: Request, res: Response) => {
    try {
        const userID = req.body.userID;
        const user = await UserInfoDB.findOne({user_id:
        userID});
        if (!user) {
            res.status(404).json({ message: "User info not found." });
            return;
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error getting user info:", error);
        res.status(500).json({ error: "An error occurred while getting user info." });
    }
}


export {
    updateUserInfo,
    getUserInfo,
};
