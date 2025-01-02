import { Request, Response } from "express";
import Job from "../models/jobModel";
import mongoose from "mongoose";
import exp from "constants";

// Create a new job
export const createJob = async (req: Request, res: Response) => {
  try {
    const { userID, isAdmin, ...jobData } = req.body;

    const job = await Job.create({ ...jobData, owner_id: userID });
    res.status(201).json({
      message: "Job created successfully",
      data: job,
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
    // Lấy dữ liệu từ query
    const { companyId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Kiểm tra company_id hợp lệ
    if (!mongoose.Types.ObjectId.isValid(companyId as string)) {
      res.status(400).json({ message: "Invalid company ID", data: [] });
    }

    // Tính toán phân trang
    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Lọc theo công ty nếu có company_id
    const filter = companyId ? { companyId } : {};

    // Lấy danh sách công việc từ database
    const jobs = await Job.find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 }); // Sắp xếp theo ngày tạo mới nhất

    // Đếm tổng số công việc
    const totalJobs = await Job.countDocuments(filter);

    // Trả về kết quả
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
    res.status(400).json({
      message: (error as any).message || "Failed to fetch jobs",
      data: [],
    });
  }
};
