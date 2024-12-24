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
