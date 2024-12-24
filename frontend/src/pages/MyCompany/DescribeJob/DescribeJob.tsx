import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";

const DescribeJob: React.FC = () => {
  const navigate = useNavigate();

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
                  <h1>Add Job Basics</h1>
                  <hr />
                </header>

                {/* Hiển thị thông tin mô tả công việc */}
                <div className="mb-3">
                  <div className="mb-2">
                    <strong>
                      Job description{" "}
                      <span className="required" style={{ color: "red" }}>
                        *
                      </span>
                    </strong>
                  </div>
                  <div
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "10px",
                      minHeight: "100px",
                      maxHeight: "280px",
                      whiteSpace: "pre-wrap",
                      overflowY: "auto",
                    }}
                  >
                    <p>
                      <strong>Responsibilities:</strong>
                    </p>
                    <ul>
                      <li>
                        Collaborate with teammates you may never see in person,
                        bonding over GIFs and memes.
                      </li>
                      <li>
                        Engage in ritualistic ceremonies, aka stand-ups, where
                        you promise to finish yesterday’s tasks today.
                      </li>
                      <li>
                        Master the ancient art of code review, where you’ll say
                        things like, “This needs more comments” and “Why are
                        there 1000 lines in this function?”
                      </li>
                      <li>
                        Implement “cutting-edge” solutions that are actually
                        held together by duct tape and caffeine.
                      </li>
                    </ul>
                    <p>
                      <strong>Requirements:</strong>
                    </p>
                    <ul>
                      <li>
                        2+ years of JavaScript (yes, it’s always JavaScript).
                      </li>
                      <li>
                        Ability to write “Hello World” in any language when
                        questioned by non-tech relatives.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Button điều hướng */}
                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      handleNavigation("/my-company/add-pays-and-benefits")
                    }
                  >
                    ← Back
                  </Button>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        handleNavigation("/my-company/preview-job")
                      }
                    >
                      Preview <i className="bi bi-eye"></i>
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleNavigation("/next-page")}
                    >
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

export default DescribeJob;
