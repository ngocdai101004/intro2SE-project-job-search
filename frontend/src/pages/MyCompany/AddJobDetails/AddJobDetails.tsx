import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import "./AddJobDetails.css";

const AddJobDetails: React.FC = () => {
  const navigate = useNavigate();

  // State để lưu dữ liệu từ form
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [hasDeadline, setHasDeadline] = useState("no");
  const [deadlineDate, setDeadlineDate] = useState("");

  // Load dữ liệu từ localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("jobPostData") || "{}");
    if (savedData.jobTypes) setJobTypes(savedData.jobTypes);
    if (savedData.hasDeadline) setHasDeadline(savedData.hasDeadline);
    if (savedData.deadlineDate) setDeadlineDate(savedData.deadlineDate);
  }, []);

  // Hàm xử lý thay đổi checkbox
  const handleJobTypeChange = (type: string) => {
    setJobTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  // Lưu dữ liệu vào localStorage và tiếp tục
  const handleSaveAndContinue = () => {
    const currentData = {
      type: jobTypes, // Chuyển thành 'type' phù hợp với model Job
      deadline: hasDeadline === "yes" ? deadlineDate : null, // Format deadline
    };

    // Lưu dữ liệu vào localStorage
    const existingData = JSON.parse(
      localStorage.getItem("jobPostData") || "{}"
    );
    localStorage.setItem(
      "jobPostData",
      JSON.stringify({ ...existingData, ...currentData })
    );

    localStorage.setItem("currentPage", "/my-company/add-pays-and-benefits");
    // Chuyển đến bước tiếp theo
    navigate("/my-company/add-pays-and-benefits");
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
                      {["full-time", "part-time", "contract", "internship"].map(
                        (type) => {
                          // Chuyển chữ cái đầu thành in hoa
                          const formattedType =
                            type.charAt(0).toUpperCase() + type.slice(1);

                          return (
                            <div className="item-type" key={type}>
                              <Form.Check
                                type="checkbox"
                                label={formattedType} // Hiển thị chữ cái đầu in hoa
                                checked={jobTypes.includes(type)}
                                onChange={() => handleJobTypeChange(type)}
                              />
                            </div>
                          );
                        }
                      )}
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
                      onClick={() => navigate("/my-company/add-job-basics")}
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

export default AddJobDetails;
