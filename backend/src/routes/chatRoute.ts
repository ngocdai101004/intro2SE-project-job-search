import {Router} from "express";
import {createChat, getChatInfo, sendMessage} from "../controllers/chatController";
import {verifyUser} from "../middlewares/verifyUser";


const router = Router();

router.use(verifyUser);
router.get("/", getChatInfo);
router.post("/create", createChat);
router.post("/", sendMessage);


export default router;
