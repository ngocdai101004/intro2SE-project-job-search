import e, { Request, Response } from "express";
import Job from "../models/jobModel";
import { getEmbedding } from "../utils/plot-embedding";
const getJobsBySearching = async (req: Request, res: Response) => {
  try {
    console.log("Searching for jobs...", req.query);
    const { query, datePost, jobType, location, salaryMin, salaryMax } =
      req.query;
    const normalizedQuery = (query as string).trim().toLowerCase();

    if (!normalizedQuery) {
      // Redirect to another API
      res.redirect("/api/job");

      return;
    }

    const filters: any = { status: "open" };

    if (jobType && (jobType as string).trim() !== "") {
      filters.type = jobType;
    }
    if (location && (location as string).trim() !== "") {
      filters.location_type = location;
    }
    console.log("Filters:", filters);
    const sortCriteria: any = {};
    sortCriteria.score = { $meta: "textScore" };
    const embeddedQuery = await getEmbedding(normalizedQuery);
    const decimalEmbeddingArray = embeddedQuery.map((value) =>
      Number(value.toString())
    );

    const result = await Job.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          // Indexed vectorEmbedding type field to search.
          path: "plot_embedding",
          queryVector: decimalEmbeddingArray,
          numCandidates: 50,
          limit: 5,
          filter: {},
        },
      },
      { $match: filters },
      { $sort: sortCriteria },
      { $limit: 20 },
      {
        $project: {
          title: 1,
          description: 1,
          location: 1,
          jobType: 1,
          open_time: 1,
          score: { $meta: "searchScore" },
        },
      },
    ]);

    console.log("Result:", result);

    // Get the job IDs from the search result
    const jobIDs = result.map((job: any) => job._id);
    // Get all the jobs with the IDs, preserving the order
    let jobs = await Job.aggregate([
      { $match: { _id: { $in: jobIDs } } },
      {
        $addFields: {
          __order: { $indexOfArray: [jobIDs, "$_id"] },
        },
      },
      { $sort: { __order: 1 } },
    ]);

    // Remove some fields
    jobs = jobs.map((job) => {
      delete job.plot_embedding;
      delete job.__v;
      return job;
    });

    // Filter by salary
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

    console.log("Jobs found:", jobs.length);

    res.status(200).json({
      message: "Jobs fetched successfully",
      data: { jobs },
    });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: [] });
  }
};

export { getJobsBySearching };
