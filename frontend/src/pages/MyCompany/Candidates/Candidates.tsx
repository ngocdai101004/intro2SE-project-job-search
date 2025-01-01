import React from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import "./Candidates.css";

const Candidates: React.FC = () => {
  return (
    <MainLayout>
      <Container fluid className="candidate-post-container">
        <Row>
          <Col style={{ paddingLeft: "0px", paddingRight: "0px" }}>
            <div className="content" style={{ width: "100%" }}>
              <div className="px-4 mt-3 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h1>Candidates</h1>
                </div>
                <div className="filter-bar">
                  <InputGroup style={{ maxWidth: "400px" }}>
                    <InputGroup.Text>
                      <i className="bi bi-filter"></i>
                    </InputGroup.Text>
                    <FormControl placeholder="Filter and search candidates" />
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
                className="candidate-table table table-spacing"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>Candidates</th>
                    <th>Job applied to</th>
                    <th style={{ width: "40%" }}>Feedback</th>
                    <th>Interested?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <p className="candidate-name">Nguyen Van A</p>
                      <div className="candidate-state">Awaiting Review</div>
                      <p
                        className="location"
                        style={{ fontSize: "12px", opacity: 0.7 }}
                      >
                        Applied: Oct 31
                      </p>
                    </td>
                    <td>
                      <span className="candidate-job">AI engineering</span>
                    </td>
                    <td>
                      <span>
                        We didn’t find matching qualifications. Review the
                        candidate’s profile to see their skills and experience.
                      </span>
                    </td>
                    <td>
                      <div className="candidate-intersted">
                        <span className="icon">&#10003;</span>
                        <span className="icon">?</span>
                        <span className="icon">&#10007;</span>
                      </div>
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

export default Candidates;
