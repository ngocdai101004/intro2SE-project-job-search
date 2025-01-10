import { useEffect, useState } from "react";
import axiosInstance from "../../../common/axiosInstance";
import { IJob } from "../../../interfaces/interfaces";
import { IJobCard } from "../../../interfaces/job";
import JobList from "../../../components/JobCard/JobList";
import JobDetail from "../../../components/JobCard/JobDetail";
import { Col, Row } from "react-bootstrap";

interface JobsProps {
  company_id: string;
}

const Jobs = ({ company_id }: JobsProps) => {
  const [jobs, setJobs] = useState<IJobCard[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJobCard | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchJobs = async () => {
      try {
        let jobList = [];
      
        const recommendedJobsResponse = await axiosInstance.get(
          `/job?company_id=${company_id}`
        );
        jobList = recommendedJobsResponse.data.data.jobs || [];
        

        const companiesResponse = await axiosInstance.get("/company");
        const companies = companiesResponse.data.data || [];

        const updatedJobs = jobList.map((job: IJob) => {
          const company = companies.find(
            (company: { _id: string }) => company._id === job.company_id
          );
          return {
            ...job,
            company_name: company?.company_name,
            company_avatar: company?.avatar,
          };
        });

        if (isMounted) {
          setJobs(updatedJobs);
          if (!selectedJob && updatedJobs.length > 0) {
            setSelectedJob(updatedJobs[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
    return () => {
      isMounted = false;
    };
  }, [company_id]);

  return (
    <div>
      <div className="d-flex flex-column">
        <div
          className="container justify-content-center"
          style={{ marginTop: "20px" }}
        >
          <Row>
            <Col
              xs={4}
              style={{
                overflow: "scroll",
                scrollbarWidth: "none",
                height: "60vh",
              }}
            >
              <JobList
                jobs={jobs}
                selectedJob={selectedJob}
                onJobSelect={setSelectedJob}
              />
            </Col>
            <Col
              xs={8}
              style={{
                overflow: "scroll",
                scrollbarWidth: "none",
                height: "60vh",
              }}
            >
              {selectedJob && <JobDetail job={selectedJob} />}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
