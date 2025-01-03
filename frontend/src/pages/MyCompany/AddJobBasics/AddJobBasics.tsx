import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";

const AddJobBasics: React.FC = () => {
  const navigate = useNavigate();

  // State để lưu dữ liệu từ form
  const [jobTitle, setJobTitle] = useState("");
  const [numPeople, setNumPeople] = useState("1");
  const [locationType, setLocationType] = useState("");

  // Load dữ liệu đã lưu trong localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("jobPostData") || "{}");
    if (savedData.title) setJobTitle(savedData.title);
    if (savedData.number_of_peoples) setNumPeople(savedData.number_of_peoples);
    if (savedData.locationType) setLocationType(savedData.advertiseLocation);
  }, []);

  // Lưu dữ liệu vào localStorage và chuyển tiếp
  const handleSaveAndContinue = () => {
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

    localStorage.setItem("currentPage", "/my-company/add-job-details");

    // Chuyển đến trang tiếp theo
    navigate("/my-company/add-job-details");
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
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
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
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
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
