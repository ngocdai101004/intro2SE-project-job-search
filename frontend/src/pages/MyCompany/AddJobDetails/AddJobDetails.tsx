import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";

const AddJobDetails: React.FC = () => {
  const navigate = useNavigate();

  // State để lưu dữ liệu từ form
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [hasDeadline, setHasDeadline] = useState("no");
  const [deadlineDate, setDeadlineDate] = useState("");

  const handleJobTypeChange = (type: string) => {
    setJobTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
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
                  <h1>Add Job Details</h1>
                  <hr />
                </header>

                {/* Form thêm thông tin */}
                <Form>
                  <Form.Group className="mb-2">
                    <strong>
                      <Form.Label column sm={12} className="text-left">
                        What type of job is it?{" "}
                        <span className="required" style={{ color: "red" }}>
                          *
                        </span>
                      </Form.Label>
                    </strong>
                    <div>
                      {[
                        "Full-time",
                        "Part-time",
                        "Temporary",
                        "Internship",
                        "Permanent",
                      ].map((type) => (
                        <div
                          key={type}
                          style={{
                            border: "1px solid #ced4da",
                            padding: "3px 10px",
                            borderRadius: "4px",
                            marginBottom: "5px",
                          }}
                        >
                          <Form.Check
                            type="checkbox"
                            label={type}
                            checked={jobTypes.includes(type)}
                            onChange={() => handleJobTypeChange(type)}
                          />
                        </div>
                      ))}
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <strong>
                      <Form.Label column sm={12} className="text-left">
                        Is there an application deadline?{" "}
                      </Form.Label>
                    </strong>
                    <div>
                      <Form.Check
                        inline
                        label="No"
                        type="radio"
                        checked={hasDeadline === "no"}
                        onChange={() => setHasDeadline("no")}
                      />
                      <Form.Check
                        inline
                        label="Yes"
                        type="radio"
                        checked={hasDeadline === "yes"}
                        onChange={() => setHasDeadline("yes")}
                      />
                    </div>
                    {hasDeadline === "yes" && (
                      <Form.Control
                        type="date"
                        value={deadlineDate}
                        onChange={(e) => setDeadlineDate(e.target.value)}
                      />
                    )}
                  </Form.Group>

                  {/* Button điều hướng */}
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      onClick={() =>
                        handleNavigation("/my-company/add-job-basics")
                      }
                    >
                      ← Back
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleNavigation("/my-company/add-pays-and-benefits")
                      }
                    >
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

export default AddJobDetails;
