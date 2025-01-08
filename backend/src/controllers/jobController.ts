import { Request, Response } from "express";
import Job from "../models/jobModel";
import UserInfo from "../models/userInfoModel";
import stringSimilarity from "string-similarity";
import mongoose from "mongoose";
import Application from "../models/applicationModel";
import exp from "constants";

// Create a new job
export const createJob = async (req: Request, res: Response) => {
  try {
    const { userID, isAdmin, ...jobData } = req.body;

    const job = await Job.create({ ...jobData, owner_id: userID });
    res.status(201).json({
      message: "Job created successfully",
      data: { job },
    });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

// Get jobs by query params
export const getJobs = async (req: Request, res: Response) => {
  try {
    const { company_id } = req.query;

    let jobs;
    if (company_id) {
      jobs = await Job.find({ company_id: company_id });
    } else {
      jobs = await Job.find();
    }

    res.status(200).json({
      message: "Jobs fetched successfully",
      data: { jobs },
    });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: [] });
  }
};

export const getJobsByCompanyId = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Kiểm tra companyId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      res.status(400).json({ message: "Invalid company ID", data: [] });
    }

    // Phân trang
    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Lấy danh sách jobs
    const jobs = await Job.find({ company_id: companyId })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    // Đếm tổng số jobs
    const totalJobs = await Job.countDocuments({ company_id: companyId });

    // Tính số lượng applicants và awaiting cho từng job
    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const applicantsCount = await Application.countDocuments({
          job_id: job._id,
          status: "applied",
        });

        const awaitingCount = await Application.countDocuments({
          job_id: job._id,
          status: "reviewing",
        });

        return {
          ...job.toObject(),
          applicantsCount,
          awaitingCount,
        };
      })
    );

    // Trả về dữ liệu
    res.status(200).json({
      message: "Jobs fetched successfully",
      data: {
        jobs: jobsWithCounts,
        totalJobs,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalJobs / pageSize),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: (error as any).message || "Failed to fetch jobs",
      data: [],
    });
  }
};

// Get job by ID in params
export const getJobByID = async (req: Request, res: Response) => {
  try {
    const { jobID } = req.params;
    const job = await Job.findById(jobID);
    res.status(200).json({
      message: "Job fetched successfully",
      data: { job },
    });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

export const getRecommendedJobs = async (req: Request, res: Response) => {
  try {
    const { userID } = req.body;

    // Get job references from user profile
    const userInfo = await UserInfo.findOne({ user_id: userID });
    const job_references = userInfo?.job_preferences || [];

    // If no job references, return 10 random jobs
    if (job_references.length === 0) {
      const jobs = await Job.aggregate([{ $sample: { size: 10 } }]);
      res.status(200).json({
        message: "Recommended jobs fetched successfully",
        data: { jobs },
      });
      return;
    }

    const normalizedReferences = job_references.map((ref) =>
      ref.job_title.toLowerCase()
    );

    // Get all jobs and filter them based on similarity
    const allJobs = await Job.find();
    const jobs = allJobs
      .map((job) => {
        let totalSimilarity = 0;
        normalizedReferences.forEach((ref) => {
          const similarity = stringSimilarity.compareTwoStrings(
            job.title.toLowerCase(),
            ref
          );
          totalSimilarity += similarity;
        });
        const avgSimilarity = totalSimilarity / normalizedReferences.length;

        return { ...job.toObject(), similarity: avgSimilarity };
      })
      .filter((job) => job.similarity >= 0.5) // Filter jobs with similarity above threshold
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10);
    res.status(200).json({
      message: "Recommended jobs fetched successfully",
      data: { jobs },
    });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: [] });
  }
};
