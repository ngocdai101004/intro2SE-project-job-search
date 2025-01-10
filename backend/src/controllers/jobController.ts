import { Request, Response } from "express";
import Job from "../models/jobModel";
import UserInfo from "../models/userInfoModel";
import stringSimilarity from "string-similarity";
import mongoose from "mongoose";
import CompanyDB from "../models/companyModel";
import { sendEmail } from "../utils/sendEmail";
import UserDB from "../models/userModel";
import Application from "../models/applicationModel";
import exp from "constants";
import { getEmbedding } from "../utils/plot-embedding";

// Create a new job
export const createJob = async (req: Request, res: Response) => {
  try {
    const { userID, isAdmin, ...jobData } = req.body;

    const job = await Job.create({
      open_time: new Date(),
      ...jobData,
      owner_id: userID,
      plot_embedding: await getEmbedding(
        jobData.title + jobData.description || ""
      ),
    });
    const userInfo = await UserInfo.find({
      following: { $in: [job.company_id] },
    });
    res.status(201).json({
      message: "Job created successfully",
      data: { job },
    });
    if (Array.isArray(userInfo)) {
      const company = await CompanyDB.findById(job.company_id);
      const companyName = company?.company_name || "Unknown";
      userInfo.forEach(async (userinfo) => {
        const user = await UserDB.findById(userinfo.user_id);
        if (user) {
          sendEmail(
            user.email,
            "New Job Alert",
            `A new job has been posted by ${companyName}. Check it out now!`
          );
        }
      });
    }
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

// Get jobs by query params
export const getJobs = async (req: Request, res: Response) => {
  try {
    const { company_id, datePost, jobType, location, salaryMin, salaryMax } =
      req.query;

    let jobs;
    if (company_id) {
      jobs = await Job.find({ company_id: company_id });
    } else {
      jobs = await Job.find()
        .select("-plot_embedding")
        .sort({ open_time: -1 })
        .limit(20);

      if (salaryMin || salaryMax) {
        const min = parseInt((salaryMin as string) || "0");
        const max = parseInt(salaryMax as string) || Number.MAX_SAFE_INTEGER;
        jobs = jobs.filter(
          (job) =>
            !job.salary ||
            (job.salary && job.salary.min >= min && job.salary.max <= max)
        );
      }

      // Filter by date posted
      if (datePost && (datePost as string).trim() !== "") {
        const now = new Date();
        const days = parseInt(datePost as string);
        const date = new Date(now.setDate(now.getDate() - days));
        jobs = jobs.filter((job) => job.open_time >= date);
      }

      if (jobType && (jobType as string).trim() !== "") {
        jobs = jobs.filter((job) => job.type === jobType);
      }

      if (location && (location as string).trim() !== "") {
        jobs = jobs.filter((job) => job.location_type === location);
      }
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
      res.status(400).json({ message: "Invalid company ID", data: null });
    }

    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Fetch company address
    const company = await CompanyDB.findById(companyId).select(
      "address.city_state address.country"
    );
    if (!company) {
      res.status(404).json({ message: "Company not found", data: null });
    }
    const city_state = company?.address?.city_state || "";
    const country = company?.address?.country || "";
    // Format the address as "city_state, country"
    const formattedAddress = `${city_state}${
      city_state && country ? ", " : ""
    }${country}`;

    // Fetch jobs with pagination
    const jobs = await Job.aggregate([
      { $match: { company_id: new mongoose.Types.ObjectId(companyId) } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: pageSize },
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "job_id",
          as: "applications",
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
          address: formattedAddress,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          location_type: 1,
          status: 1,
          number_of_peoples: 1,
          deadline: 1,
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          applicantsCount: 1,
          awaitingsCount: 1,
          address: 1,
        },
      },
      // { $sort: { createdAt: -1 } },
      // { $skip: skip },
      // { $limit: pageSize },
    ]);

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

// Get job by ID in params
export const getJobByID = async (req: Request, res: Response) => {
  try {
    const { jobID } = req.params;
    const job = await Job.findById(jobID).select("-plot_embedding");
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

    // If no job references, return 20 random jobs
    if (job_references.length === 0) {
      const jobs = await Job.find()
        .select("-plot_embedding")
        .sort({ open_time: -1 })
        .limit(20);
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
    const allJobs = await Job.find().select("-plot_embedding");
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
      .filter((job) => job.similarity >= 0.2) // Filter jobs with similarity above threshold
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 20);

    if (jobs.length < 20) {
      const additionalJobs = await Job.find({
        _id: { $nin: jobs.map((job) => job._id) },
      })
        .sort({ open_time: -1 })
        .limit(20 - jobs.length);
      const additionalJobsWithSimilarity = additionalJobs.map((job) => ({
        ...job.toObject(),
        similarity: 0, // or any default similarity value
      }));
      jobs.push(...additionalJobsWithSimilarity);
    }

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
