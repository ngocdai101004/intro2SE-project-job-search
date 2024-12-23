import { useEffect, useState } from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import axiosInstance from "../../../common/axiosInstance";
import JobDetail from "./JobDetail";

interface iJobDescription {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
  requirements: string[];
}

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
};

const Jobs = () => {
  const [jobs, setJobs] = useState(
    Array(10)
      .fill(jobInstance)
      .map((job, index) => ({ ...job, id: index }))
  );
  const [selectedJob, setSelectedJob] = useState<iJobDescription | null>(null);

  const fetchJobs = async () => {
    try {
      const res = await axiosInstance.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
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
          md={4}
          style={{ overflow: "scroll", scrollbarWidth: "none", height: "60vh" }}
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
                    selectedJob?.id === job.id ? "#e7f3ff" : "#f8f9fa",
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

        <Col md={8}>
          {selectedJob ? (
            <JobDetail job={selectedJob} />
          ) : (
            <div>Select a job to see the details</div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Jobs;
