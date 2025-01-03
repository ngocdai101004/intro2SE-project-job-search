import {Router} from "express";
import {createChat, getChatInfo, sendMessage} from "../controllers/chatController";
import {verifyUser} from "../middlewares/verifyUser";


const router = Router();

router.use(verifyUser);
router.get("/", getChatInfo);
router.post("/id/create", createChat);
router.post("/:id", sendMessage);


export default router;
