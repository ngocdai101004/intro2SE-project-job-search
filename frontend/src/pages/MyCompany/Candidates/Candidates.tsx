import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import axiosInstance from "../../../common/axiosInstance";
import "./Candidates.css";

interface Candidate {
  id: string;
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

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // State lưu danh sách ứng viên
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(""); // Error state

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
      const companyId = "6776acea66277d8c90632d9f"; // ID công ty

      // Truy vấn dữ liệu với tham số phân trang
      const response = await axiosInstance.get(
        `/applicant/${companyId}?page=${page}&limit=2` // Giới hạn 5 ứng viên mỗi trang
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

  // Xử lý chuyển trang
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchCandidates(newPage);
    }
  };

  useEffect(() => {
    fetchCandidates(); // Gọi API khi component mount
  }, []);

  return (
    <MainLayout>
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
                      <th>
                        <input type="checkbox" />
                      </th>
                      <th>Candidates</th>
                      <th>Job applied to</th>
                      <th style={{ width: "40%" }}>Feedback</th>
                      <th>Interested?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.length > 0 ? (
                      candidates.map((candidate, index) => (
                        <tr key={index}>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td>
                            <p className="candidate-name">
                              {candidate.candidateName}
                            </p>
                            <div className="candidate-state">
                              Awaiting Review
                            </div>
                            <p
                              className="location"
                              style={{ fontSize: "12px", opacity: 0.7 }}
                            >
                              Applied: {candidate.appliedDate}
                            </p>
                          </td>
                          <td>
                            <span className="candidate-job">
                              {candidate.jobTitle}
                            </span>
                          </td>
                          <td>
                            <span>
                              {candidate.feedback || "No feedback provided"}
                            </span>
                          </td>
                          <td>
                            <div className="candidate-intersted">
                              <span className="icon">&#10003;</span>
                              <span className="icon">?</span>
                              <span className="icon">&#10007;</span>
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
