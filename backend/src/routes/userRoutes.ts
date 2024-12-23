import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import {updateUserInfo, getUserInfo} from "../controllers/userController";

const router = Router();
router.use(verifyUser);

router.post("/info", updateUserInfo);
router.get("/info", getUserInfo);


export default router;
