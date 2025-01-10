import React, { useState, useEffect} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import axiosInstance from "../../../common/axiosInstance";
import "./Candidates.css";
import { useParams } from "react-router-dom";
import { JobDetailProps } from "../../../interfaces/job";
import JobDetail from "../../../components/JobCard/JobDetail";
import { Modal } from "react-bootstrap";
interface Candidate {
  id: string;
  jobId: string;
  companyId: string;
  companyName: string;
  companyAvatar: string;
  candidateName: string;
  jobTitle: string;
  feedback: string;
  appliedDate: string;
  status: string;
}

interface Pagination {
  totalCandidates: number;
  currentPage: number;
  totalPages: number;
}

interface CandidateWithJob extends Candidate {
  job: JobDetailProps;
}

const Candidates: React.FC = () => {
  const { company_id } = useParams<{ company_id: string }>();
  const [candidates, setCandidates] = useState<Candidate[]>([]); // State lưu danh sách ứng viên
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(""); // Error state
  const [candidateWithJob, setCandidateWithJob] = useState<CandidateWithJob[]>([])
  const [selectedJob, setSelectedJob] = useState<JobDetailProps | null>(null);
  const [editingFeedbackId, setEditingFeedbackId] = useState<string | null>(
    null
  ); // ID của feedback đang chỉnh sửa
  const [editedFeedback, setEditedFeedback] = useState<string>(""); // Feedback được chỉnh sửa

  // Phân trang
  const [pagination, setPagination] = useState<Pagination>({
    totalCandidates: 0,
    currentPage: 1,
    totalPages: 1,
  });

  // Fetch dữ liệu từ API
  const fetchCandidates = async (page: number = 1) => {
    setLoading(true);
    try {
      // Truy vấn dữ liệu với tham số phân trang
      const response = await axiosInstance.get(
        `/applicant/${company_id}?page=${page}&limit=2` // Giới hạn 5 ứng viên mỗi trang
      );

      // Nhận dữ liệu trả về
      const { data } = response;
      setCandidates(data.candidates || []);
      setPagination({
        totalCandidates: data.totalCandidates,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      });

    } catch (error) {
      console.error("Error fetching candidates:", error);
      setError("Failed to fetch candidates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      const updatedCandidates = await Promise.all(
        candidates.map(async (candidate) => {
          const job = await axiosInstance.get(`/job/${candidate.jobId}`);
          const jobDetail = {
            ...job.data.data.job,
            company_name: candidate.companyName,
            company_avatar: candidate.companyAvatar,
          };
          const jobDetailProps = {
            job: jobDetail,
          }
          return { ...candidate, job: jobDetailProps };
        })
      );
      setCandidateWithJob(updatedCandidates);
    };

    fetchJobDetails();
  }, [candidates]);

  // Xử lý chuyển trang
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchCandidates(newPage);
    }
  };

  useEffect(() => {
    fetchCandidates(); // Gọi API khi component mount
  }, []);

  // Xử lý khi click vào feedback để chỉnh sửa
  const handleEditFeedback = (id: string, currentFeedback: string) => {
    setEditingFeedbackId(id); // Chuyển ID vào state
    setEditedFeedback(currentFeedback); // Cập nhật feedback hiện tại
  };

  // Xử lý thay đổi feedback trong textarea
  const handleFeedbackChange = (value: string) => {
    setEditedFeedback(value); // Cập nhật giá trị feedback trong state
  }; // Xử lý lưu feedback lên server
  const handleSaveFeedback = async (id: string) => {
    try {
      // Gửi yêu cầu API cập nhật feedback
      await axiosInstance.patch(`/applicant/${id}/feedback`, {
        feedback: editedFeedback,
      });

      // Cập nhật lại feedback trong danh sách ứng viên
      const updatedCandidates = candidates.map((candidate) =>
        candidate.id === id
          ? { ...candidate, feedback: editedFeedback }
          : candidate
      );
      setCandidates(updatedCandidates);

      // Thoát chế độ chỉnh sửa
      setEditingFeedbackId(null);
    } catch (error) {
      console.error("Failed to update feedback:", error);
    }
  };

  // Hủy chỉnh sửa feedback
  const handleCancelEdit = () => {
    setEditingFeedbackId(null); // Thoát chế độ chỉnh sửa
    setEditedFeedback(""); // Xóa feedback được chỉnh sửa
  };

  const updateApplicantStatus = async (id: string, status: string) => {
    try {
      await axiosInstance.patch(`/applicant/${id}/status`, { status });

      // Cập nhật trạng thái trong danh sách
      const updatedCandidates = candidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status } : candidate
      );
      setCandidates(updatedCandidates);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <MainLayout company_id={company_id!}>
      <Container fluid className="candidate-post-container">
        <Row>
          <Col style={{ paddingLeft: "0px", paddingRight: "0px" }}>
            <div className="content" style={{ width: "100%" }}>
              <div className="px-4 mt-3 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h1>Candidates</h1>
                </div>
              </div>
              {loading ? (
                <p>Loading candidates...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : (
                <table
                  className="candidate-table table table-spacing"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th></th>
                      <th>Candidates</th>
                      <th>Job applied to</th>
                      <th style={{ width: "40%" }}>Feedback</th>
                      <th>Interested?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidateWithJob.length > 0 ? (
                      candidateWithJob.map((candidate, index) => (
                        <tr key={index}>
                          <td></td>
                          <td>
                            <p className="candidate-name">
                              {candidate.candidateName}
                            </p>
                            <div className="candidate-state">
                              {candidate.status === "reviewing"
                                ? "Awaiting Review"
                                : candidate.status === "rejected"
                                ? "Rejected"
                                : "Applied"}
                            </div>
                            <p
                              className="location"
                              style={{ fontSize: "12px", opacity: 0.7 }}
                            >
                              Applied: {candidate.appliedDate}
                            </p>
                          </td>
                          <td>
        
                          <button
                            className="btn"
                            style={{ padding: "0", margin: "-3px" }}
                            onClick={() => setSelectedJob(candidate.job)}
                          >
                            <span className="candidate-job">
                              {candidate.jobTitle}
                            </span>
                          </button>
                          {selectedJob && (
                            <Modal show={true} onHide={() => setSelectedJob(null)} size="xl">
                              <Modal.Header closeButton>
                              <Modal.Title>Job Details</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                              <JobDetail job={selectedJob.job} notApply={true} />
                              </Modal.Body>
                              <Modal.Footer>
                              <Button variant="secondary" onClick={() => setSelectedJob(null)}>
                                Close
                              </Button>
                              </Modal.Footer>
                            </Modal>
                          )}
                          </td>
                          <td>
                            {editingFeedbackId === candidate.id ? (
                              // Hiển thị chế độ chỉnh sửa nếu đang chỉnh sửa feedback
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <textarea
                                  value={editedFeedback}
                                  onChange={(e) =>
                                    handleFeedbackChange(e.target.value)
                                  }
                                  style={{ width: "100%", marginRight: "10px" }}
                                />
                                <button
                                  className="btn btn-success"
                                  onClick={() =>
                                    handleSaveFeedback(candidate.id)
                                  }
                                  style={{ marginRight: "5px" }}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-secondary"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              // Hiển thị feedback dưới dạng văn bản nếu không chỉnh sửa
                              <span
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleEditFeedback(
                                    candidate.id,
                                    candidate.feedback
                                  )
                                }
                              >
                                {candidate.feedback || "No feedback"}{" "}
                                {/* Hiển thị feedback */}
                              </span>
                            )}
                          </td>
                          <td>
                            <div className="candidate-intersted">
                              <span
                                className="icon"
                                onClick={() =>
                                  updateApplicantStatus(candidate.id, "applied")
                                }
                              >
                                &#10003;
                              </span>
                              <span
                                className="icon"
                                onClick={() =>
                                  updateApplicantStatus(
                                    candidate.id,
                                    "reviewing"
                                  )
                                }
                              >
                                ?
                              </span>
                              <span
                                className="icon"
                                onClick={() =>
                                  updateApplicantStatus(
                                    candidate.id,
                                    "rejected"
                                  )
                                }
                              >
                                &#10007;
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center" }}>
                          No candidates found.
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
                  Page {pagination.currentPage} of {pagination.totalPages}
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

export default Candidates;
