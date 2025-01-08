import React from "react";
import { JobListProps } from "../../interfaces/job";
import JobListCard from "./JobListCard";

const JobList: React.FC<JobListProps> = ({
  jobs,
  selectedJob,
  onJobSelect,
}) => {
  return (
    <div>
      {jobs.map((job) => (
        <JobListCard
          key={job._id}
          job={job}
          isSelected={selectedJob?._id === job._id}
          onClick={() => onJobSelect(job)}
        />
      ))}
    </div>
  );
};

export default JobList;
