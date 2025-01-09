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
      return;
    }

    // Phân trang
    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Lấy danh sách jobs cùng thông tin applicants và awaitings
    const jobs = await Job.aggregate([
      {
        $match: { company_id: new mongoose.Types.ObjectId(companyId) },
      },
      {
        $lookup: {
          from: "companies", // Tên collection Company trong MongoDB
          localField: "company_id",
          foreignField: "_id",
          as: "companyInfo",
        },
      },
      {
        $unwind: "$companyInfo", // Trích xuất thông tin companyInfo
      },
      {
        $lookup: {
          from: "applications", // Tên collection Application
          localField: "_id", // job._id
          foreignField: "job_id", // application.job_id
          as: "applications", // Kết quả ghép sẽ nằm trong mảng "applications"
        },
      },
      {
        $addFields: {
          applicantsCount: {
            $size: {
              $filter: {
                input: "$applications",
                as: "application",
                cond: { $eq: ["$$application.status", "applied"] },
              },
            },
          },
          awaitingsCount: {
            $size: {
              $filter: {
                input: "$applications",
                as: "application",
                cond: { $eq: ["$$application.status", "reviewing"] },
              },
            },
          },
          address: "$companyInfo.address.city_state", // Lấy trực tiếp city_state làm address
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          status: 1,
          number_of_peoples: 1,
          deadline: 1,
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          applicantsCount: 1,
          awaitingsCount: 1,
          address: 1, // Chỉ giữ lại trường address
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: pageSize },
    ]);

    // Đếm tổng số jobs
    const totalJobs = await Job.countDocuments({ company_id: companyId });

    // Trả về dữ liệu
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

    console.log(jobID, status);

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
