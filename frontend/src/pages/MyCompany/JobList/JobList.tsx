import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
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
          <Col style={{ paddingLeft: "0px" }}>
            <div className="content" style={{ width: "100%" }}>
              <div className="px-4 mt-3 mb-4">
                <header className="header mb-3">
                  <h1>Jobs</h1>
                </header>
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
                      >
                        ▼
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
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>Job title ⇵</th>
                    <th>Candidates</th>
                    <th>Date posted ⇧</th>
                    <th>Job status ⇩</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
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
                    <td>-</td>
                    <td>-</td>
                    <td>{jobStatus.softwareEngineer}</td>
                  </tr>
                  <tr>
                    <td>
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
                      <div className="candidates">
                        <span>1 Applicants</span>
                        <span>0 Awaiting</span>
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
                        className="form-select"
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
