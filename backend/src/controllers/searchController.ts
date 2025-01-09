import e, { Request, Response } from "express";
import Job from "../models/jobModel";

const getJobsBySearching = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    const normalizedQuery = (query as string).trim().toLowerCase();
    if (!normalizedQuery) {
      res.status(400).json({ message: "Search query is required." });
      return;
    }
    const searchQuery = {
      $text: { $search: normalizedQuery },
      status: "open",
    };
    const jobs = await Job.find(searchQuery, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } })
      .limit(20);

    res.status(200).json({
      message: "Jobs fetched successfully",
      data: { jobs },
    });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: [] });
  }
};

export { getJobsBySearching };
