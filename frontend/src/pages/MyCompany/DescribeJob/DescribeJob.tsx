import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../common/axiosInstance";
import "./DescribeJob.css";

const DescribeJob: React.FC = () => {
  const navigate = useNavigate();

  // State để lưu dữ liệu hiển thị
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // Trạng thái loading

  // Load dữ liệu từ localStorage khi render lại trang
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("jobPostData") || "{}");
    if (savedData.responsibilities)
      setResponsibilities(savedData.responsibilities);
    if (savedData.requirements) setRequirements(savedData.requirements);
  }, []);

  // Hàm xử lý khi bấm nút Continue
  const handleSaveToDatabase = async () => {
    const jobData = JSON.parse(localStorage.getItem("jobPostData") || "{}");

    // Xử lý dữ liệu trước khi gửi lên backend
    const formattedData = {
      company_id: "6769263f8133514e228544bd", // Thay bằng ID thực tế
      status: "open", // Mặc định trạng thái là 'open'
      title: jobData.jobTitle || "Untitled Job",
      number_of_peoples: parseInt(jobData.numPeople) || 1, // Chuyển thành số
      type: jobData.type[0] || "full-time", // Lấy giá trị đầu tiên của mảng
      location_type: "on-site", // Tạm thời hardcode hoặc lấy từ jobData
      description: jobData.description || "No description provided.", // Mặc định nếu không có
      salary:
        jobData.payType === "Range"
          ? parseInt(jobData.salary.split("-")[0]) // Lấy giá trị tối thiểu
          : parseInt(jobData.salary), // Nếu là Fixed
      rate: jobData.rate || "per month",
      emails: "example@example.com", // Đặt email mặc định hoặc cho nhập
      requirements: jobData.requirements || [],
      responsibilities: jobData.responsibilities || [],
      deadline: jobData.deadline || new Date().toISOString(), // Mặc định ngày hiện tại
    };

    // Kiểm tra dữ liệu đã định dạng
    console.log("Formatted Data:", formattedData);

    // Xác thực dữ liệu trước khi gửi
    if (
      !formattedData.title ||
      !formattedData.type ||
      !formattedData.location_type ||
      !formattedData.salary ||
      !formattedData.deadline
    ) {
      alert("Missing required fields. Please complete all steps.");
      return;
    }

    setLoading(true); // Bật trạng thái loading

    try {
      // Gửi dữ liệu lên API backend
      const response = await axiosInstance.post("/job/create", formattedData);

      alert("Job created successfully!");
      console.log(response.data);

      // Xoá dữ liệu trong localStorage
      localStorage.removeItem("jobPostData");

      // Chuyển đến trang danh sách công việc
      navigate("/my-company/job-list");
    } catch (error: any) {
      console.error("Error creating job:", error);
      alert(
        error?.response?.data?.message ||
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
    <MainLayout>
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
                  <div className="mb-2">
                    <strong>
                      Job description{" "}
                      <span className="required" style={{ color: "red" }}>
                        *
                      </span>
                    </strong>
                  </div>
                  <div className="job-description">
                    <p>
                      <strong>Responsibilities:</strong>
                    </p>
                    <ul>
                      {responsibilities.length > 0 ? (
                        responsibilities.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))
                      ) : (
                        <li>No responsibilities added.</li>
                      )}
                    </ul>

                    <p>
                      <strong>Requirements:</strong>
                    </p>
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
                        handleNavigation("/my-company/preview-job")
                      }
                    >
                      Preview <i className="bi bi-eye"></i>
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleSaveToDatabase}
                      disabled={loading} // Vô hiệu hóa nút khi đang loading
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
