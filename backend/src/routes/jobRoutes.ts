import { Router } from "express";
import { findJobsByCompanyId } from "../controllers/jobController";

const router = Router();

router.get("/company/:company_id/jobs", (req, res, next) => {
  findJobsByCompanyId(req, res).catch(next);
});
