import { useEffect, useState } from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import axiosInstance from "../../../common/axiosInstance";
import JobDetail from "./JobDetail";
import { IJob } from "../../../interfaces/interfaces";

const jobInstance = {
  id: 1,
  title: "Associate Machine Learning Engineer, Zalopay Hehehe",
  location: "Ho Chi Minh, Viet Nam",
  date: "25 days ago",
  description:
    "Zalopay is looking for an Associate Machine Learning Engineer to join our team. You will be responsible for developing machine learning models and deploying them to production.",
  requirements: [
    "Bachelor's degree in Computer Science or related field",
    "Experience with Python and machine learning libraries",
    "Experience with cloud computing platforms",
  ],
  employmentType: "Full-time", // Loại hình việc làm
  workMode: "On-site", // Hình thức làm việc
  applicantCount: 150, // Số lượng ứng viên
  level: "Internship", // Cấp độ công việc
};

interface JobsProps {
  company_id: string;
}

const Jobs = ({ company_id }: JobsProps) => {
  const [jobs, setJobs] = useState(
    Array(10)
      .fill(jobInstance)
      .map((job, index) => ({ ...job, id: index }))
  );
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);

  const fetchJobs = async () => {
    // setLoading(true);
    // setError(null); // Reset error state
    try {
      const response = await axiosInstance.get(`/company/${company_id}/jobs`); // Sử dụng company_id từ URL
      setJobs(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching company data:", error);
      // setError("Failed to fetch company data. Please try again later.");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                key={job.id}
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
                  {job.location}
                </div>
                <div className="text-muted" style={{ fontSize: "13px" }}>
                  {job.date}
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
