import {NextFunction,Request,Response, Router} from 'express';
import {verifyUser} from "../middlewares/verifyUser";

const router = Router();

import {
    checkUser,
    loginUser,
    registerUser,
    logoutUser,
    verifyEmail,
    getVerifyCode,
    resetPassword,
} from "../controllers/authController";

router.get(
    "/check",
    (req: Request, res: Response ,next: NextFunction) => {
        setTimeout(() => {
            next();  // Call next() after the timeout, for visualizing the loading spinner
        }, 1000);
    },
    verifyUser,
    checkUser
);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", logoutUser);
router.post("/verify_account", verifyUser ,verifyEmail);
router.post("/get_code", getVerifyCode);
router.post("/reset_password", resetPassword);

export default router;
