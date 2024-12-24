import { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import axiosInstance from "../../common/axiosInstance";
import MyHeader from "../../components/MyHeader";

interface iJobDescription {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
  requirements: string[];
  employmentType: string; // e.g., Full-time, Part-time
  workMode: string; // e.g., On-site, Remote
  applicantCount: number; // Số lượng ứng viên
  level: string; // e.g., Internship, Entry-level, Mid-level, Senior-level
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
  employmentType: "Full-time", // Loại hình việc làm
  workMode: "On-site", // Hình thức làm việc
  applicantCount: 150, // Số lượng ứng viên
  level: "Internship", // Cấp độ công việc
};

const CompanyList = () => {
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
    <div>
      <MyHeader mydefaultActiveKey="/company" />
      <Container className="container mt-4">
        <h3 className="mb-3">Company List</h3>

        <ListGroup
          style={{ overflow: "scroll", scrollbarWidth: "none", height: "75vh" }}
        >
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
      </Container>
    </div>
  );
};

export default CompanyList;
