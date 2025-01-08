import { Router } from "express";
import {
  getApplicantInfos,
  updateApplicantFeedback,
} from "../controllers/applicantController";

const router = Router();

router.get("/:companyId", getApplicantInfos);
router.patch("/:applicantId/feedback", updateApplicantFeedback);

export default router;
