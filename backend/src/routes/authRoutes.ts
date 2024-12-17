import {Router, Request, Response} from 'express';
import {verifyUser} from "../middlewares/verifyUser";

const router = Router();

import {
    loginUser,
    registerUser,
    logoutUser,
    verifyEmail,
    getVerifyCode,
    resetPassword,
    sendVerificationEmail
} from "../controllers/authController";

router.get("/check", verifyUser);
router.post("/login", loginUser);
router.post("/register", registerUser, sendVerificationEmail);
router.get("/logout", logoutUser);
router.post("/email/verify", verifyEmail);
router.post("/email/code", getVerifyCode);
router.post("/password/reset", resetPassword);

export default router;
