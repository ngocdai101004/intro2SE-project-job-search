import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import "./JobList.css";

interface JobStatus {
  aiEngineering: string;
  softwareEngineer: string;
}

const JobList: React.FC = () => {
  const [jobStatus, setJobStatus] = useState<JobStatus>({
    aiEngineering: "Closed",
    softwareEngineer: "Draft",
  });

  const handleStatusChange = (job: keyof JobStatus, status: string) => {
    setJobStatus((prev) => ({
      ...prev,
      [job]: status,
    }));
  };

  return (
    <MainLayout>
      <Container fluid className="job-post-container">
        <Row>
          <Col style={{ paddingLeft: "0px", paddingRight: "0px" }}>
            <div className="content" style={{ width: "100%" }}>
              <div className="px-4 mt-3 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h1>Jobs</h1>
                  <Button
                    variant="primary"
                    style={{ marginRight: "60px", fontWeight: "500" }}
                  >
                    Post a job
                  </Button>
                </div>
                <div className="filter-bar">
                  <InputGroup style={{ maxWidth: "400px" }}>
                    <InputGroup.Text>
                      <i className="bi bi-filter"></i>
                    </InputGroup.Text>
                    <FormControl placeholder="Filter and search jobs" />
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="outline-secondary"
                        id="dropdown-basic"
                        bsPrefix="custom-dropdown-toggle"
                      >
                        <i className="bi bi-chevron-down"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#">Option 1</Dropdown.Item>
                        <Dropdown.Item href="#">Option 2</Dropdown.Item>
                        <Dropdown.Item href="#">Option 3</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </InputGroup>
                </div>
              </div>
              <table
                className="job-table table table-spacing"
                style={{ width: "100%" }}
              >
                <thead style={{ backgroundColor: "#D9D9D9" }}>
                  <tr>
                    <th style={{ backgroundColor: "#D9D9D9" }}>
                      <input type="checkbox" />
                    </th>
                    <th
                      style={{
                        backgroundColor: "#D9D9D9",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      Job title{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-chevrons-up-down"
                      >
                        <path d="m7 15 5 5 5-5" />
                        <path d="m7 9 5-5 5 5" />
                      </svg>
                    </th>
                    <th style={{ backgroundColor: "#D9D9D9" }}>Candidates</th>
                    <th
                      style={{
                        backgroundColor: "#D9D9D9",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      Date posted
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-chevrons-up-down"
                      >
                        <path d="m7 15 5 5 5-5" />
                        <path d="m7 9 5-5 5 5" />
                      </svg>
                    </th>
                    <th style={{ backgroundColor: "#D9D9D9" }}>
                      Job status
                      <i
                        className="bi bi-chevron-down"
                        style={{ fontSize: "12px" }}
                      ></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ height: "130px" }}>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <span
                        className="job-title"
                        style={{
                          fontWeight: "bold",
                          textDecoration: "underline",
                        }}
                      >
                        Software engineer
                      </span>
                      <p
                        className="location"
                        style={{ fontSize: "12px", opacity: 0.7 }}
                      >
                        Ho Chi Minh City
                      </p>
                    </td>
                    <td>
                      <div
                        style={{
                          backgroundColor: "#FFF5F5",
                          padding: "10px",
                          borderRadius: "5px",
                          marginTop: "10px",
                          maxWidth: "300px",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          height: "100px",
                        }}
                      >
                        <i
                          className="bi bi-info-circle-fill"
                          style={{
                            color: "#D9534F",
                            fontSize: "20px",
                          }}
                        ></i>
                        <div style={{ flexGrow: 1 }}>
                          <p
                            style={{
                              fontWeight: "bold",
                              marginBottom: "10px",
                            }}
                          >
                            Your job posting is incomplete.
                          </p>
                          <button className="complete-btn btn btn-primary">
                            Finish job posting
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>-</td>
                    <td>{jobStatus.softwareEngineer}</td>
                  </tr>
                  <tr>
                    <td style={{ height: "130px" }}>
                      <input type="checkbox" defaultChecked />
                    </td>
                    <td>
                      <span
                        className="job-title"
                        style={{
                          fontWeight: "bold",
                          textDecoration: "underline",
                        }}
                      >
                        AI engineering
                      </span>
                      <p
                        className="location"
                        style={{ fontSize: "12px", opacity: 0.7 }}
                      >
                        Ho Chi Minh City
                      </p>
                    </td>
                    <td>
                      <div
                        style={{
                          backgroundColor: "#F3F2F1",
                          padding: "10px",
                          borderRadius: "5px",
                          marginTop: "10px",
                          maxWidth: "300px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "100px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            paddingLeft: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              position: "relative",
                            }}
                          >
                            <i className="bi bi-person"></i>
                            <span
                              style={{
                                position: "absolute",
                                top: "-4px",
                                right: "-5px",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              1
                            </span>
                          </div>
                          <p
                            style={{
                              fontWeight: "bold",
                              textDecoration: "underline",
                            }}
                          >
                            Applicants
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            paddingRight: "40px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              position: "relative",
                            }}
                          >
                            <i className="bi bi-hourglass-split"></i>
                            <span
                              style={{
                                position: "absolute",
                                top: "-4px",
                                right: "-7px",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              0
                            </span>
                          </div>
                          <p
                            style={{
                              fontWeight: "bold",
                              textDecoration: "underline",
                            }}
                          >
                            Awaiting
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p>5 minutes ago</p>
                      <p>October 31st, 2024</p>
                    </td>
                    <td>
                      <select
                        value={jobStatus.aiEngineering}
                        onChange={(e) =>
                          handleStatusChange("aiEngineering", e.target.value)
                        }
                        style={{ padding: "5px", width: "100%" }}
                      >
                        <option value="Closed">Closed</option>
                        <option value="Paused">Paused</option>
                        <option value="Open">Open</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default JobList;
