import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AddJobBasics: React.FC = () => {
  const navigate = useNavigate();
  const { company_id } = useParams<{ company_id: string }>();

  // State để lưu dữ liệu từ form
  const [jobTitle, setJobTitle] = useState("");
  const [numPeople, setNumPeople] = useState("1");
  const [locationType, setLocationType] = useState("");
  const [error, setError] = useState(""); // State để lưu lỗi của Job Title

  // Load dữ liệu đã lưu trong localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("jobPostData") || "{}");
    if (savedData.title) setJobTitle(savedData.title);
    if (savedData.number_of_peoples) setNumPeople(savedData.number_of_peoples);
    if (savedData.locationType) setLocationType(savedData.advertiseLocation);
  }, []);

  // Lưu dữ liệu vào localStorage và chuyển tiếp
  const handleSaveAndContinue = () => {
    if (!jobTitle.trim()) {
      // Nếu Job title trống, hiển thị lỗi và ngừng thực hiện
      setError("Job title is required.");
      return;
    }
    setError(""); // Xóa lỗi nếu đã nhập

    const currentData = {
      title: jobTitle, // Đặt tên phù hợp với model Job
      number_of_peoples: parseInt(numPeople), // Số lượng người cần tuyển
      locationType,
    };

    // Lưu dữ liệu vào localStorage
    const existingData = JSON.parse(
      localStorage.getItem("jobPostData") || "{}"
    );
    localStorage.setItem(
      "jobPostData",
      JSON.stringify({ ...existingData, ...currentData })
    );

    localStorage.setItem(
      "currentPage",
      `/my-company/${company_id}/add-job-details`
    );

    // Chuyển đến trang tiếp theo
    navigate(`/my-company/${company_id}/add-job-details`);
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
                <header className="header mb-4">
                  <h1>Add Job Basics</h1>
                  <hr />
                </header>

                {/* Form thêm thông tin */}
                <Form>
                  <Form.Group className="mb-3" controlId="formJobTitle">
                    <strong>
                      <Form.Label column sm={12} className="text-left">
                        Job title{" "}
                        <span className="required" style={{ color: "red" }}>
                          *
                        </span>
                      </Form.Label>
                    </strong>
                    <Form.Control
                      type="text"
                      placeholder="Enter job title"
                      value={jobTitle}
                      onChange={(e) => {
                        setJobTitle(e.target.value);
                        if (error) setError(""); // Xóa lỗi khi có sự thay đổi trong trường nhập
                      }}
                      onFocus={() => {
                        if (error) setError(""); // Xóa lỗi khi trường được focus
                      }}
                      isInvalid={!!error} // Đánh dấu lỗi nếu có
                    />
                    {/* Hiển thị lỗi nếu có */}
                    <Form.Control.Feedback type="invalid">
                      {error}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formNumPeople">
                    <strong>
                      <Form.Label column sm={12} className="text-left">
                        Number of people to hire for this job{" "}
                        <span className="required" style={{ color: "red" }}>
                          *
                        </span>
                      </Form.Label>
                    </strong>
                    <Form.Select
                      value={numPeople}
                      onChange={(e) => setNumPeople(e.target.value)}
                    >
                      {/* Tạo các tùy chọn từ 1 đến 50 */}
                      {Array.from({ length: 50 }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {/* Location Type Section */}
                  <Form.Group className="mb-3">
                    <strong>
                      <Form.Label column sm={12} className="text-left">
                        Work Location Type
                      </Form.Label>
                    </strong>
                    <Form.Select
                      value={locationType}
                      onChange={(e) => setLocationType(e.target.value)}
                    >
                      <option value="remote">Remote</option>
                      <option value="on-site">On-site</option>
                      <option value="hybrid">Hybrid</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Button điều hướng */}
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      onClick={() => navigate("/my-company/create-job-post")}
                    >
                      ← Back
                    </Button>
                    <Button variant="primary" onClick={handleSaveAndContinue}>
                      Continue →
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default AddJobBasics;
