import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import { getUserProfile } from "../controllers/userController";

const router = Router();

router.get("/", verifyUser, getUserProfile);

export default router;
