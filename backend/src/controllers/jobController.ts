import { Request, Response } from "express";
import Job from "../models/jobModel";
import UserInfo from "../models/userInfoModel";
import stringSimilarity from "string-similarity";
import mongoose from "mongoose";
import Application from "../models/applicationModel";
import CompanyDB from "../models/companyModel";
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

    // Validate companyId
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      res.status(400).json({ message: "Invalid company ID", data: [] });
    }

    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Fetch jobs with pagination
    const jobs = await Job.find({ company_id: companyId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .select("_id title status number_of_peoples deadline createdAt");

    // Total job count
    const totalJobs = await Job.countDocuments({ company_id: companyId });

    res.status(200).json({
      message: "Jobs fetched successfully",
      data: {
        jobs,
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

export const getCompanyAddressByCompanyId = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;

    // Validate companyId
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      res.status(400).json({ message: "Invalid company ID", data: null });
    }

    // Fetch company by ID and select city_state and country
    const company = await CompanyDB.findById(companyId).select(
      "address.city_state address.country"
    );

    if (!company) {
      res.status(404).json({ message: "Company not found", data: null });
    }

    // Ensure address exists before destructuring
    const city_state = company?.address?.city_state || "";
    const country = company?.address?.country || "";

    // Format the address as "city_state, country"
    const formattedAddress = `${city_state}${city_state && country ? ", " : ""}${country}`;

    res.status(200).json({
      message: "Company address fetched successfully",
      data: {
        address: formattedAddress.trim(),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: (error as any).message || "Failed to fetch company address",
      data: null,
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
// Cập nhật trạng thái công việc
export const updateJobStatus = async (req: Request, res: Response) => {
  try {
    const { jobID } = req.params; // Lấy jobID từ params
    const { status } = req.body; // Lấy status từ body

    // Kiểm tra trạng thái hợp lệ
    const validStatuses = ["open", "closed", "draft"];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: "Invalid status" });
    }

    // Tìm và cập nhật trạng thái công việc
    const updatedJob = await Job.findByIdAndUpdate(
      jobID,
      { status: status },
      { new: true } // Trả về dữ liệu mới sau khi cập nhật
    );

    if (!updatedJob) {
      res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job status updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      message: (error as any).message || "Failed to update job status",
    });
  }
};
