import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../common/axiosInstance";
import "./DescribeJob.css";
import { useParams } from "react-router-dom";

const DescribeJob: React.FC = () => {
  const navigate = useNavigate();
  const { company_id } = useParams<{ company_id: string }>();

  // State để lưu dữ liệu hiển thị
  const [description, setDescription] = useState<string>(""); // Mô tả công việc
  const [benefits, setBenefits] = useState<string[]>([]); // Lợi ích
  const [responsibilities, setResponsibilities] = useState<string[]>([]); // Trách nhiệm
  const [requirements, setRequirements] = useState<string[]>([]); // Yêu cầu
  const [salary, setSalary] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  }); // Lương
  const [loading, setLoading] = useState(false); // Trạng thái loading

  // Load dữ liệu từ localStorage khi render lại trang
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("jobPostData") || "{}");
    if (savedData.description) setDescription(savedData.description);
    if (savedData.benefits) setBenefits(savedData.benefits);
    if (savedData.responsibilities)
      setResponsibilities(savedData.responsibilities);
    if (savedData.requirements) setRequirements(savedData.requirements);
    if (savedData.salary) setSalary(savedData.salary);
  }, []);

  // Hàm xử lý khi bấm nút Continue
  const handleSaveToDatabase = async () => {
    const jobData = JSON.parse(localStorage.getItem("jobPostData") || "{}");

    // Xử lý dữ liệu trước khi gửi lên backend
    const formattedData = {
      company_id: company_id, // Thay bằng ID thực tế
      status: "open",
      title: jobData.title || "Untitled Job",
      number_of_peoples: jobData.number_of_peoples || 1,
      type: jobData.type[0] || "full-time",
      location_type: jobData.locationType || "on-site",
      description: description || "No description provided.",
      salary: {
        min: parseInt(salary.min) || 0,
        max: parseInt(salary.max) || 0,
      },
      emails: "example@example.com",
      requirements: requirements || [],
      responsibilities: responsibilities || [],
      benefits: benefits || [],
      deadline: jobData.deadline || new Date().toISOString(),
      open_time: new Date().toISOString(),
    };

    console.log(
      formattedData.title,
      formattedData.salary.min,
      formattedData.salary.max,
      formattedData.deadline
    );

    setLoading(true);

    try {
      await axiosInstance.post("/job/create", formattedData);

      // Xóa dữ liệu trong localStorage
      localStorage.removeItem("jobPostData");

      // Chuyển đến trang danh sách công việc
      navigate(`/my-company/${company_id}/job-list`);
    } catch (error: any) {
      console.error("Error creating job:", error);
      alert(
        error.response?.data?.message ||
          "Failed to create job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <MainLayout company_id={company_id!}>
      <Container fluid className="job-post-container">
        <Row>
          <Col>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "60vh" }}
            >
              <div
                className="content p-4"
                style={{ maxWidth: "600px", width: "100%" }}
              >
                <header className="header mb-3">
                  <h1>Describe the job</h1>
                  <hr />
                </header>

                {/* Hiển thị thông tin mô tả công việc */}
                <div className="mb-3">
                  <div className="job-description">
                    {/* Description */}
                    <strong>
                      <p>Description:</p>
                    </strong>
                    <p>{description || "No description provided."}</p>

                    {/* Benefits */}
                    <strong>
                      <p>Benefits:</p>
                    </strong>
                    <ul>
                      {benefits.length > 0 ? (
                        benefits.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))
                      ) : (
                        <li>No benefits added.</li>
                      )}
                    </ul>

                    {/* Responsibilities */}
                    <strong>
                      <p>Responsibilities:</p>
                    </strong>
                    <ul>
                      {responsibilities.length > 0 ? (
                        responsibilities.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))
                      ) : (
                        <li>No responsibilities added.</li>
                      )}
                    </ul>

                    {/* Requirements */}
                    <strong>
                      <p>Requirements:</p>
                    </strong>
                    <ul>
                      {requirements.length > 0 ? (
                        requirements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))
                      ) : (
                        <li>No requirements added.</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Button điều hướng */}
                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      handleNavigation("/my-company/add-job-description")
                    }
                  >
                    ← Back
                  </Button>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        handleNavigation(
                          `/my-company/${company_id}/preview-job`
                        )
                      }
                    >
                      Preview <i className="bi bi-eye"></i>
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleSaveToDatabase}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Continue →"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default DescribeJob;
