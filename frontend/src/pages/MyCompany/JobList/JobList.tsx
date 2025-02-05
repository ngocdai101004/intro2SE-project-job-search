import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import axiosInstance from "../../../common/axiosInstance";
import "./JobList.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

interface Job {
  _id: string;
  title: string;
  location_type: string;
  address: string;
  status: string;
  number_of_peoples: number;
  deadline: string;
  createdAt: string;
  applicantsCount: number;
  awaitingsCount: number;
}

interface Pagination {
  totalJobs: number;
  currentPage: number;
  totalPages: number;
}

const JobList: React.FC = () => {
  const { company_id } = useParams<{ company_id: string }>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<Pagination>({
    totalJobs: 0,
    currentPage: 1,
    totalPages: 1,
  });

  const [jobStatus, setJobStatus] = useState<{ [key: string]: string }>({});
  const [incompleteJobs, setIncompleteJobs] = useState<{
    [key: string]: boolean;
  }>({});

  const fetchJobs = async (page: number = 1) => {
    setLoading(true);
    try {
      let fetchedJobs: Job[] = [];
  
      // Số lượng job cần hiển thị trên mỗi trang
      const limit = 2;
  
      // Kiểm tra dữ liệu trong localStorage
      const savedData = JSON.parse(
        localStorage.getItem("jobPostData") || "null"
      );

      const currentPage = localStorage.getItem("currentPage");
      let hasLocalJob = false;  
      console.log("Current page:", currentPage);   

      if (
        page === 1 &&
        savedData &&
        currentPage !== `/my-company/${company_id}/describe-job`
      ) {
        hasLocalJob = true;
  
        const localJob = {
          _id: "local",
          title: savedData.title || "Untitled Job",
          location_type: savedData.locationType || "",
          address: savedData.address || "",
          status: "closed",
          number_of_peoples: savedData.number_of_peoples || 0,
          deadline: savedData.deadline || "",
          createdAt: new Date().toISOString(),
          applicantsCount: 0,
          awaitingsCount: 0,
        };
  
        fetchedJobs.push(localJob);
        setIncompleteJobs({ [localJob._id]: true });
      }
  
      // Fetch dữ liệu từ database
      const response = await axiosInstance.get(
        `/job/company/${company_id}?page=${page}&limit=2`
      );
  
      const {
        jobs: dbJobs,
        totalJobs,
        totalPages,
        currentPage: dbCurrentPage,
      } = response.data.data;
  
      const statusMap: { [key: string]: string } = {};
      const incompleteMap: { [key: string]: boolean } = {};
  
      dbJobs.forEach((job: Job) => {
        statusMap[job._id] = job.status;
        incompleteMap[job._id] = false; // Job từ database luôn hoàn thiện
      });
  
      fetchedJobs = [...fetchedJobs, ...dbJobs];
      fetchedJobs = fetchedJobs.slice(0, limit);
  
      setJobs(fetchedJobs);
      setPagination({
        totalJobs: hasLocalJob ? totalJobs + 1 : totalJobs,
        currentPage: dbCurrentPage,
        totalPages: totalPages,
      });
      setJobStatus(statusMap);
      setIncompleteJobs((prev) => ({ ...prev, ...incompleteMap }));
    } catch (err: any) {
      console.error("Error fetching jobs:", err);
      setError(
        err.response?.data?.message || "Failed to fetch jobs. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [company_id]);
  
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchJobs(newPage); // Không thêm job local khi chuyển trang
    }
  };


  const updateJobStatus = async (jobId: string, newStatus: string) => {
    try {
      await axiosInstance.patch(`/job/${jobId}/status`, {
        status: newStatus, // Trạng thái mới
      });

      // Cập nhật trạng thái trong state
      const updatedJobs = jobs.map((job) =>
        job._id === jobId ? { ...job, status: newStatus } : job
      );
      setJobs(updatedJobs);
    } catch (error: any) {
      console.error("Failed to update job status:", error);
      alert(error.response?.data?.message || "Failed to update job status.");
    }
  };

  const handleStatusChange = (jobId: string, newStatus: string) => {
    setJobStatus((prev) => ({
      ...prev,
      [jobId]: newStatus,
    }));

    updateJobStatus(jobId, newStatus);
  };

  const handlePostJob = () => {
    navigate(`/my-company/${company_id}/create-job-post`);
  };

  const handleCompleteJob = () => {
    const currentPage = localStorage.getItem("currentPage");
    if (currentPage) {
      navigate(currentPage);
    }
  };

  return (
    <MainLayout company_id={company_id!}>
      <Container fluid className="job-post-container">
        <Row>
          <Col style={{ paddingLeft: "0px", paddingRight: "0px" }}>
            <div className="content" style={{ width: "100%" }}>
              <div className="px-4 mt-3 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h1>Jobs</h1>
                  <Button
                    variant="primary"
                    style={{ marginRight: "60px", fontWeight: "500" }}
                    onClick={handlePostJob}
                  >
                    Post a job
                  </Button>
                </div>
              </div>
              {loading ? (
                <p>Loading jobs...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : (
                <table
                  className="job-table table table-spacing"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }}></th>
                      <th style={{ width: "20%" }}>
                        Job title
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-chevrons-up-down"
                        >
                          <path d="m7 15 5 5 5-5" />
                          <path d="m7 9 5-5 5 5" />
                        </svg>
                      </th>
                      <th style={{ width: "35%" }}>Candidates</th>
                      <th style={{ width: "25%" }}>
                        <div className="title-icon">
                          Date posted
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-chevrons-up-down"
                          >
                            <path d="m7 15 5 5 5-5" />
                            <path d="m7 9 5-5 5 5" />
                          </svg>
                        </div>
                      </th>
                      <th style={{ width: "20%" }}>
                        Job status
                        <i className="bi bi-chevron-down"></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.length > 0 ? (
                      jobs.map((job) => (
                        <tr key={job._id}>
                          <td></td>
                          <td>
                            <span
                              className="job-title"
                              style={{
                                fontWeight: "bold",
                                textDecoration: "underline",
                              }}
                            >
                              {job.title}
                            </span>
                            <p
                              className="location"
                              style={{ fontSize: "12px", opacity: 0.7 }}
                            >
                              {job.address}
                            </p>
                          </td>
                          <td>
                            {incompleteJobs[job._id] ? (
                              <div className="candidates-incomplete">
                                <i
                                  className="bi bi-info-circle-fill"
                                  style={{ color: "#D9534F", fontSize: "20px" }}
                                ></i>
                                <div style={{ flexGrow: 1 }}>
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    Your job posting is incomplete.
                                  </p>
                                  <button
                                    className="complete-btn btn btn-primary"
                                    onClick={handleCompleteJob}
                                  >
                                    Finish job posting
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="candidates-complete">
                                <div className="candidates-applicants">
                                  <div className="icon-number">
                                    <i className="bi bi-person"></i>
                                    <span>{job.applicantsCount}</span>
                                  </div>
                                  <p>Applicants</p>
                                </div>
                                <div className="candidates-awaiting">
                                  <div className="icon-number">
                                    <i className="bi bi-hourglass-split"></i>
                                    <span style={{ right: "-7px" }}>
                                      {job.awaitingsCount}
                                    </span>
                                  </div>
                                  <p>Awaitings</p>
                                </div>
                              </div>
                            )}
                          </td>
                          <td>
                            <p>{job.createdAt}</p>
                          </td>
                          <td>
                            <select
                              value={jobStatus[job._id] || job.status}
                              onChange={(e) =>
                                handleStatusChange(job._id, e.target.value)
                              }
                              style={{ padding: "5px", width: "100%" }}
                            >
                              <option value="closed">Closed</option>
                              <option value="draft">Paused</option>
                              <option value="open">Open</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center" }}>
                          No jobs found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              {/* Phân trang */}
              <div className="pagination-controls d-flex justify-content-center mt-3">
                <Button
                  variant="outline-primary"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                >
                  Previous
                </Button>
                <span className="mx-3">
                  Page {pagination.currentPage || 1} of{" "}
                  {pagination.totalPages || 1}
                </span>
                <Button
                  variant="outline-primary"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage >= pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default JobList;
