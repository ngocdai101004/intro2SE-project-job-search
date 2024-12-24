import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import {
  createCompany,
  updateCompany,
  getCompany,
  deleteCompany,
  followCompany,
  unfollowCompany,
  reviewCompany,
  updateCompanyReview,
  deleteCompanyReview,
  getCompanyReviews,
} from "../controllers/companyController";

const router = Router();

router.post("/company", verifyUser, createCompany);
