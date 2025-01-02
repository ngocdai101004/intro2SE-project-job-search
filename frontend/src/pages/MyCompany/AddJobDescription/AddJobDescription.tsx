import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";

const AddJobDescription: React.FC = () => {
  const navigate = useNavigate();

  // State để lưu dữ liệu từ form
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);

  // Load dữ liệu từ localStorage khi render lại trang
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("jobPostData") || "{}");
    if (savedData.responsibilities)
      setResponsibilities(savedData.responsibilities);
    if (savedData.requirements) setRequirements(savedData.requirements);
  }, []);

  // Hàm thêm dòng mới cho Responsibilities
  const addResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
  };

  // Hàm thêm dòng mới cho Requirements
  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  // Xử lý thay đổi nội dung Responsibilities
  const handleResponsibilityChange = (index: number, value: string) => {
    const updated = [...responsibilities];
    updated[index] = value;
    setResponsibilities(updated);
  };

  // Xử lý thay đổi nội dung Requirements
  const handleRequirementChange = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  // Lưu dữ liệu vào localStorage và chuyển tiếp
  const handleSaveAndContinue = () => {
    const currentData = {
      responsibilities,
      requirements,
    };

    // Lưu dữ liệu vào localStorage
    const existingData = JSON.parse(
      localStorage.getItem("jobPostData") || "{}"
    );
    localStorage.setItem(
      "jobPostData",
      JSON.stringify({ ...existingData, ...currentData })
    );

    // Chuyển đến trang tiếp theo
    navigate("/my-company/describe-job");
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
                  <h1>Add job description</h1>
                  <hr />
                </header>

                {/* Responsibilities */}
                <Form.Group className="mb-3">
                  <strong>
                    Responsibilities{" "}
                    <span className="required" style={{ color: "red" }}>
                      *
                    </span>
                  </strong>
                  {responsibilities.map((responsibility, index) => (
                    <Form.Control
                      key={index}
                      type="text"
                      placeholder={`Responsibility ${index + 1}`}
                      value={responsibility}
                      onChange={(e) =>
                        handleResponsibilityChange(index, e.target.value)
                      }
                      className="mb-2"
                    />
                  ))}
                  <Button
                    variant="outline-secondary"
                    onClick={addResponsibility}
                  >
                    + Add Responsibility
                  </Button>
                </Form.Group>

                {/* Requirements */}
                <Form.Group className="mb-3">
                  <strong>
                    Requirements{" "}
                    <span className="required" style={{ color: "red" }}>
                      *
                    </span>
                  </strong>
                  {requirements.map((requirement, index) => (
                    <Form.Control
                      key={index}
                      type="text"
                      placeholder={`Requirement ${index + 1}`}
                      value={requirement}
                      onChange={(e) =>
                        handleRequirementChange(index, e.target.value)
                      }
                      className="mb-2"
                    />
                  ))}
                  <Button variant="outline-secondary" onClick={addRequirement}>
                    + Add Requirement
                  </Button>
                </Form.Group>

                {/* Button điều hướng */}
                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      navigate("/my-company/add-pays-and-benefits")
                    }
                  >
                    ← Back
                  </Button>
                  <div className="d-flex gap-2">
                    <Button variant="primary" onClick={handleSaveAndContinue}>
                      Continue →
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

export default AddJobDescription;
