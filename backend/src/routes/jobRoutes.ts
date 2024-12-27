import e, { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import { verifyAdmin } from "../middlewares/verifyAdmin";

import { createJob } from "../controllers/jobController";

const router = Router();

router.post("/create", verifyUser, verifyAdmin, createJob);

export default router;
