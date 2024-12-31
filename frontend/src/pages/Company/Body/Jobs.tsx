import { useEffect, useState } from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import axiosInstance from "../../../common/axiosInstance";
import JobDetail from "./JobDetail";
import { IJob } from "../../../interfaces/interfaces";

interface JobsProps {
  company_id: string;
}

const Jobs = ({ company_id }: JobsProps) => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);

  const fetchJobs = async () => {
    // setLoading(true);
    // setError(null); // Reset error state
    try {
      const response = await axiosInstance.get(`/job?company_id=${company_id}`); // Sử dụng company_id từ URL
      setJobs(response.data.data.jobs);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching company data:", error);
      // setError("Failed to fetch company data. Please try again later.");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    console.log(company_id);
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company_id]);

  return (
    <div className="container">
      <Row
        style={{
          margin: "20px 0 20px 0",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        {jobs.length} jobs at DPTT Corporation
      </Row>
      <Row>
        <Col
          xs={selectedJob ? 4 : 12}
          style={{ overflow: "scroll", scrollbarWidth: "none", height: "52vh" }}
        >
          <ListGroup>
            {jobs.map((job) => (
              <ListGroup.Item
                key={job ? job._id : "jobID"}
                action
                onClick={() => {
                  setSelectedJob(job);
                }}
                style={{
                  border: "1px solid lightgray",
                  borderRadius: "8px",
                  marginBottom: "0.5rem",
                  backgroundColor:
                    selectedJob?._id === job._id ? "#e7f3ff" : "#f8f9fa",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  {job.title}
                </div>
                <div className="text-muted" style={{ fontSize: "13px" }}>
                  {job.description}
                </div>
                <div className="text-muted" style={{ fontSize: "13px" }}>
                  {job.createdAt}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col xs={selectedJob ? 8 : 0}>
          {selectedJob ? <JobDetail job={selectedJob} /> : <> </>}
        </Col>
      </Row>
    </div>
  );
};

export default Jobs;
