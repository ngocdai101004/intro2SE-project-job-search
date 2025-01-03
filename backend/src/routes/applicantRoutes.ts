import { Router } from "express";
import { getApplicantInfos } from "../controllers/applicantController";

const router = Router();

router.get("/:companyId", getApplicantInfos);

export default router;
