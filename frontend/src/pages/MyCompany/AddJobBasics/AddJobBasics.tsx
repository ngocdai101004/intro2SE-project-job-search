import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";

const AddJobBasics: React.FC = () => {
  const navigate = useNavigate();

  // State để lưu dữ liệu từ form
  const [jobTitle, setJobTitle] = useState("");
  const [numPeople, setNumPeople] = useState("1");
  const [advertiseLocation, setAdvertiseLocation] = useState("");

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

                  <Form.Group
                    className="mb-3"
                    controlId="formAdvertiseLocation"
                  >
                    <strong>
                      <Form.Label column sm={12} className="text-left">
                        Where would you like to advertise this job?{" "}
                        <span className="required" style={{ color: "red" }}>
                          *
                        </span>
                      </Form.Label>
                    </strong>
                    <Form.Control
                      type="text"
                      placeholder="Enter location"
                      value={advertiseLocation}
                      onChange={(e) => setAdvertiseLocation(e.target.value)}
                    />
                  </Form.Group>

                  {/* Button điều hướng */}
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      onClick={() =>
                        handleNavigation("/my-company/create-job-post")
                      }
                    >
                      ← Back
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleNavigation("/my-company/add-job-details")
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

export default AddJobBasics;
