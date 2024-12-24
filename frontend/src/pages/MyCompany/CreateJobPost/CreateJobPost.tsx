import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";

const CreateJobPost: React.FC = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState<string>("new");

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <MainLayout>
      {" "}
      {/* Sử dụng layout chung */}
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
                  <h1>Create a job post</h1>
                  <hr /> {/* Đường kẻ ngang */}
                </header>

                <Form className="form-section">
                  {/* Câu hỏi */}
                  <Form.Group as={Row} className="mb-3 align-items-center">
                    <strong>
                      <Form.Label column sm={12} className="text-left">
                        How would you like to post your job?{" "}
                        <span className="required" style={{ color: "red" }}>
                          *
                        </span>
                      </Form.Label>
                    </strong>
                  </Form.Group>

                  {/* Tùy chọn tiếp tục */}
                  <Form.Group as={Row} className="mb-3 align-items-center">
                    <Col sm={12}>
                      <Form.Check
                        type="radio"
                        label={
                          <>
                            Continue with your job post
                            <div className="description text-muted small">
                              We've saved your progress so you can pick up where
                              you left off.
                            </div>
                          </>
                        }
                        name="jobPostOption"
                        value="continue"
                        checked={selectedOption === "continue"}
                        onChange={() => setSelectedOption("continue")}
                      />
                    </Col>
                  </Form.Group>

                  {/* Tùy chọn tạo mới */}
                  <Form.Group as={Row} className="mb-3 align-items-center">
                    <Col sm={12}>
                      <Form.Check
                        type="radio"
                        label="Create a brand new post"
                        name="jobPostOption"
                        value="new"
                        checked={selectedOption === "new"}
                        onChange={() => setSelectedOption("new")}
                      />
                    </Col>
                  </Form.Group>

                  {/* Nút tiếp tục */}
                  <Form.Group as={Row} className="mt-4">
                    <Col sm={12} className="d-flex justify-content-end">
                      <Button
                        className="continue-btn"
                        onClick={() =>
                          handleNavigation("/my-company/add-job-basics")
                        }
                      >
                        Continue →
                      </Button>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default CreateJobPost;
