import {NextFunction, Response} from "express";
import {IVerifiedRequest} from "../interfaces/interfaces";
import {decodeToken} from "../utils/decodeToken";

export const verifyUser = async (req: IVerifiedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (!token) {
        res.status(401).json({message: "Token not found"});
        return;
    }
    try {
        const decoded = decodeToken(token);
        if (typeof decoded === 'string') {
            throw new Error(decoded);
        }
        req.body.userID = decoded.payload.userID;
        req.body.isVerified = decoded.payload.isVerified;
        next();
    } catch (error) {
        if (error instanceof Error) {
            // console.error('Token verification error:', error.message);
            res.status(401).json({ message: error.message });
        } else {
            // console.error('Unknown error during token verification:', error);
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};