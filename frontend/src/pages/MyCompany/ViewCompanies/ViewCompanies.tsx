import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axiosInstance from "../../../common/axiosInstance";
import { useNavigate } from "react-router-dom";
import MyHeader from "../../../components/MyHeader";

interface IMyCompany {
  _id: string;
  company_name: string;
  role: string;
  address: string;
  createdAt: string;
}

interface Pagination {
  totalCompanies: number;
  currentPage: number;
  totalPages: number;
}

const ViewCompanies: React.FC = () => {
  const [companies, setCompanies] = useState<IMyCompany[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<Pagination>({
    totalCompanies: 0,
    currentPage: 1,
    totalPages: 1,
  });

  const fetchCompanies = async (page: number = 1) => {
    setLoading(true);
    try {
      const limit = 2; // Số lượng công ty trên mỗi trang
      const getUserId = await axiosInstance.get("/user/profile");
      const user_id = getUserId.data.data.user._id;

      const response = await axiosInstance.get(
        `/company/view-company/${user_id}?page=${page}&limit=${limit}`
      );

      console.log("Response:", response);

      const {
        companies: dbCompanies,
        totalCompanies,
        totalPages,
        currentPage: dbCurrentPage,
      } = response.data.data;

      setCompanies(dbCompanies);
      setPagination({
        totalCompanies,
        currentPage: dbCurrentPage,
        totalPages,
      });
    } catch (err: any) {
      console.error("Error fetching companies:", err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch companies. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchCompanies(newPage);
    }
  };

  const handleCreateCompanyPage = () => {
    navigate("/build-company");
  };

  return (
    <Container fluid className="job-post-container">
      <Row>
        <MyHeader mydefaultActiveKey="company" />
        <Col style={{ paddingLeft: "0px", paddingRight: "0px" }}>
          <div className="content" style={{ width: "100%" }}>
            <div className="px-4 mt-3 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Your company pages</h1>
                <Button
                  variant="primary"
                  style={{ marginRight: "60px", fontWeight: "500" }}
                  onClick={handleCreateCompanyPage}
                >
                  Create new company page
                </Button>
              </div>
            </div>
            {loading ? (
              <p>Loading companies...</p>
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
                    <th style={{ width: "25%" }}>Name Company</th>
                    <th style={{ width: "25%" }}>Date Created</th>
                    <th style={{ width: "25%" }}>Role</th>
                    <th style={{ width: "20%" }}>Go to page</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.length > 0 ? (
                    companies.map((company) => (
                      <tr key={company._id}>
                        <td></td>
                        <td>
                          <span
                            className="job-title"
                            style={{
                              fontWeight: "bold",
                              textDecoration: "underline",
                            }}
                          >
                            {company.company_name}
                          </span>
                          <p
                            className="location"
                            style={{ fontSize: "12px", opacity: 0.7 }}
                          >
                            {company.address}
                          </p>
                        </td>
                        <td>{company.createdAt}</td>
                        <td>
                          <strong>
                            <span>{company.role}</span>
                          </strong>
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            onClick={() =>
                              navigate(`/my-company/${company._id}/job-list`)
                            }
                          >
                            Go to page
                          </Button>
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
  );
};

export default ViewCompanies;
