import React, { useEffect, useState } from "react";
import { Card, Col, Nav, Row, Image } from "react-bootstrap";
import axiosInstance from "../../../common/axiosInstance";

interface CompanyHeaderProps {
  myState?: string;
  setMyState?: React.Dispatch<React.SetStateAction<string>>;
}

const CompanyHeader = ({ myState, setMyState }: CompanyHeaderProps) => {
  const myActiveKey = myState || "/snapshot";
  const setMyActiveKey = setMyState || (() => {});

  const getinfo = async () => {
    try {
      const res = await axiosInstance.get("/company");
      setCompanyName(res.data.companyName);
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const [companyName, setCompanyName] = useState("");
  useEffect(() => {
    getinfo();
  }, []);
  // use realod

  return (
    <div className="bg-cyan py-3 pb-0">
      <div className="container">
        {/* Header Section */}
        <div className="row">
          <Card
            className="col-auto d-flex mb-3 mb-md-0"
            style={{ backgroundColor: "#00000000", border: "none" }}
          >
            <Row>
              <Col xs="auto" className="d-flex justify-content-center">
                <Image
                  src="\company-avatar.jpg" // Đặt đường dẫn tới logo
                  roundedCircle
                  style={{ width: "80px" }}
                />
              </Col>
              <Col className="d-flex flex-column justify-content-center">
                <h5 className="mb-1">{companyName || "Fusodoya Company"}</h5>
                <div className="d-flex align-items-center mb-1">
                  <span className="me-2 text-primary fw-bold">4.0</span>
                  <div className="text-warning">
                    {"★".repeat(4)}
                    {"☆"}
                  </div>
                  <small className="text-muted ms-2">2.0k reviews</small>
                </div>
                <small className="text-muted">
                  21,000 others have applied here
                </small>
              </Col>
            </Row>
          </Card>

          <Card
            className="col-auto d-flex justify-content-center ms-md-auto"
            style={{ backgroundColor: "#00000000", border: "none" }}
          >
            <Row className="mb-2">
              <Col xs="auto" className="d-flex justify-content-center">
                <button className="btn btn-primary">Follow</button>
              </Col>
              <Col xs="auto" className="d-flex justify-content-center">
                <button className="btn btn-outline-primary">
                  Write a review
                </button>
              </Col>
            </Row>
            <Row>
              <Col xs="auto" className="d-flex justify-content-center">
                <small className="text-muted">217K followers</small>
              </Col>
              <Col xs="auto" className="d-flex justify-content-center">
                <small className="text-muted">1K-5K employees </small>
              </Col>
            </Row>
          </Card>
        </div>

        {/* Navbar Section */}
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <Nav
              className="mx-auto"
              variant="underline"
              activeKey={myActiveKey}
              onSelect={(selectedKey) =>
                setMyActiveKey(selectedKey || "/snapshot")
              }
            >
              <Nav.Item className="me-2 me-md-5">
                <Nav.Link
                  eventKey="/snapshot"
                  href=""
                  className="text-dark fs-5"
                >
                  Snapshot
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className="me-2 me-md-5">
                <Nav.Link eventKey="/jobs" href="" className="text-dark fs-5">
                  Jobs
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className="me-2 me-md-5">
                <Nav.Link
                  eventKey="/reviews"
                  href=""
                  className="text-dark fs-5"
                >
                  Reviews
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className="me-2 me-md-5">
                <Nav.Link eventKey="/qa" href="" className="text-dark fs-5">
                  Q&A
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;
