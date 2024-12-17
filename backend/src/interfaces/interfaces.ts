import {Request} from "express";

export interface IUser {
    userID: string;
    username: string;
    email: string;
    password: string;
    is_verified: boolean;
    verification_code: string;
    createdAt: string;
}

export interface IJwtPayload {
    userID: string;
    isVerified: boolean;
}

export interface IVerifiedRequest extends Request {
    body: {
        user: IUser
    }
}