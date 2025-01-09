import { Router } from "express";
import {
  getApplicantInfos,
  updateApplicantFeedback,
  updateApplicantStatus,
  saveApplicant,
} from "../controllers/applicantController";

const router = Router();

router.get("/:companyId", getApplicantInfos);
router.patch("/:applicantId/feedback", updateApplicantFeedback);
router.patch("/:applicantId/status", updateApplicantStatus);
router.post("/apply", saveApplicant);

export default router;
