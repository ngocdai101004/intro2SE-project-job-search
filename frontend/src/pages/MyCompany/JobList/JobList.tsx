import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import axiosInstance from "../../../common/axiosInstance";
import "./JobList.css";

interface Job {
  _id: string;
  title: string;
  location_type: string;
  status: string;
  number_of_peoples: number;
  deadline: string;
  createdAt: string;
}

// Định nghĩa kiểu dữ liệu phân trang
interface Pagination {
  totalJobs: number;
  currentPage: number;
  totalPages: number;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // Lưu danh sách jobs
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
  const [error, setError] = useState<string>(""); // Lưu lỗi nếu có

  const [pagination, setPagination] = useState<Pagination>({
    totalJobs: 0,
    currentPage: 1,
    totalPages: 2,
  }); // Lưu thông tin phân trang

  const [jobStatus, setJobStatus] = useState<{ [key: string]: string }>({}); // Lưu trạng thái job

  // Hàm fetch dữ liệu jobs từ backend
  const fetchJobs = async (page: number = 1) => {
    setLoading(true);
    try {
      const companyId = "6776acea66277d8c90632d9f"; // Thay bằng company_id thực tế
      const response = await axiosInstance.get(
        `/job?companyId=${companyId}&page=${page}&limit=5`
      );

      const { jobs, totalJobs, totalPages, currentPage } = response.data.data;

      setJobs(jobs); // Lưu danh sách jobs
      setPagination({ totalJobs, currentPage, totalPages }); // Lưu phân trang

      // Lưu trạng thái job
      const statusMap: { [key: string]: string } = {};
      jobs.forEach((job: Job) => {
        statusMap[job._id] = job.status;
      });
      setJobStatus(statusMap);
    } catch (err: any) {
      console.error("Error fetching jobs:", err);
      setError(
        err.response?.data?.message || "Failed to fetch jobs. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component render lần đầu
  useEffect(() => {
    fetchJobs();
  }, []);

  // Hàm thay đổi trạng thái job
  const handleStatusChange = (jobId: string, status: string) => {
    setJobStatus((prev) => ({
      ...prev,
      [jobId]: status,
    }));
  };

  // Xử lý chuyển trang
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchJobs(newPage);
    }
  };

  return (
    <MainLayout>
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
                  >
                    Post a job
                  </Button>
                </div>
                <div className="filter-bar">
                  <InputGroup style={{ maxWidth: "400px" }}>
                    <InputGroup.Text>
                      <i className="bi bi-filter"></i>
                    </InputGroup.Text>
                    <FormControl placeholder="Filter and search jobs" />
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="outline-secondary"
                        id="dropdown-basic"
                        bsPrefix="custom-dropdown-toggle"
                      >
                        <i className="bi bi-chevron-down"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#">Option 1</Dropdown.Item>
                        <Dropdown.Item href="#">Option 2</Dropdown.Item>
                        <Dropdown.Item href="#">Option 3</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </InputGroup>
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
                      <th>
                        <input type="checkbox" />
                      </th>
                      <th>
                        <div className="title-icon">
                          Job title{" "}
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
                      <th>Candidates</th>
                      <th>
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
                      <th>
                        Job status
                        <i
                          className="bi bi-chevron-down"
                          style={{ fontSize: "12px" }}
                        ></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      //   <tr>
                      //   <td>
                      //     <input type="checkbox" />
                      //   </td>
                      //   <td>
                      //     <span className="job-title">Software engineer</span>
                      //     <p
                      //       className="location"
                      //       style={{ fontSize: "12px", opacity: 0.7 }}
                      //     >
                      //       Ho Chi Minh City
                      //     </p>
                      //   </td>
                      //   <td>
                      //     <div className="candidates-incomplete">
                      //       <i
                      //         className="bi bi-info-circle-fill"
                      //         style={{
                      //           color: "#D9534F",
                      //           fontSize: "20px",
                      //         }}
                      //       ></i>
                      //       <div style={{ flexGrow: 1 }}>
                      //         <p
                      //           style={{
                      //             fontWeight: "bold",
                      //             marginBottom: "10px",
                      //           }}
                      //         >
                      //           Your job posting is incomplete.
                      //         </p>
                      //         <button className="complete-btn btn btn-primary">
                      //           Finish job posting
                      //         </button>
                      //       </div>
                      //     </div>
                      //   </td>
                      //   <td>-</td>
                      //   <td>{jobStatus.softwareEngineer}</td>
                      // </tr>
                      <tr key={job._id}>
                        <td>
                          <input type="checkbox" defaultChecked />
                        </td>
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
                            Ho Chi Minh City
                          </p>
                        </td>
                        <td>
                          <div className="candidates-complete">
                            <div className="candidates-applicants">
                              <div className="icon-number">
                                <i className="bi bi-person"></i>
                                <span>1</span>
                              </div>
                              <p>Applicants</p>
                            </div>
                            <div className="candidates-awaiting">
                              <div className="icon-number">
                                <i className="bi bi-hourglass-split"></i>
                                <span
                                  style={{
                                    right: "-7px",
                                  }}
                                >
                                  0
                                </span>
                              </div>
                              <p>Awaiting</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p>5 minutes ago</p>
                          <p>{job.createdAt}</p>
                        </td>
                        <td>
                          <select
                            value={jobStatus[job._id]}
                            onChange={(e) =>
                              handleStatusChange(job._id, e.target.value)
                            }
                            style={{ padding: "5px", width: "100%" }}
                          >
                            <option value="Closed">Closed</option>
                            <option value="Paused">Paused</option>
                            <option value="Open">Open</option>
                          </select>
                        </td>
                      </tr>
                    ))}
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
              ;
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default JobList;
