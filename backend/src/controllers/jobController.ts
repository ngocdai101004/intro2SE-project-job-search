import { Request, Response } from "express";
import Job from "../models/jobModel";

// Create a new job
export const createJob = async (req: Request, res: Response) => {
  try {
    const { userID, ...jobData } = req.body;
    const job = await Job.create({ ...jobData, owner_id: userID });
    res.status(201).json({
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

export const findJobsByCompanyId = async (req: Request, res: Response) => {
  const { company_id } = req.params;

  try {
    // Kiểm tra các tham số cần thiết
    if (!company_id) {
      return res.status(400).json({
        message: "Company ID is required",
        data: [],
      });
    }

    // Tìm kiếm công việc dựa trên company_id và active_key
    const jobs = await Job.find({
      companyId: company_id,
    });

    // Trả về danh sách công việc (mảng rỗng nếu không có công việc nào)
    res.status(200).json({
      message: "Jobs retrieved successfully",
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: (error as any).message,
      data: [],
    });
  }
};
