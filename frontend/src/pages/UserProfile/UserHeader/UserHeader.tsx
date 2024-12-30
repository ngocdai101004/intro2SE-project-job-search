import React from "react";
import { Card, Col, Nav, Row, Image } from "react-bootstrap";
import IUser from "../../../interfaces/user";
import IUserInfo from "../../../interfaces/userinfo";

interface UserHeaderProps {
  myState?: string;
  setMyState?: React.Dispatch<React.SetStateAction<string>>;
  userData: {
    user: IUser;
    userInfo: IUserInfo;
  };
}


const UserHeader = ({ myState, setMyState, userData }: UserHeaderProps) => {
  const myActiveKey = myState || "/snapshot";
  const setMyActiveKey = setMyState || (() => {});
  console.log("User Main Profile Data:", userData);
  console.log("userData.user.last_name", userData.user.last_name);


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
                  style={{ width: "80px", height: "80px" }}
                />
              </Col>
              <Col className="d-flex flex-column justify-content-center">
                <h5 className="mb-1">
                  {(userData.user.first_name || "") +
                    " " +
                    (userData.user.last_name || "") || "Company"}
                </h5>
                <small
                  className="text-muted"
                  style={{ wordWrap: "break-word", maxWidth: "300px" }}
                >
                  {userData.userInfo.short_bio || "User Bio"}
                </small>
              </Col>
            </Row>
          </Card>

          <Card
            className="col-auto d-flex justify-content-start ms-md-auto"
            style={{ backgroundColor: "#00000000", border: "none" }}
          >
            <Row className="mb-2">
              <Col xs="auto" className="d-flex align-items-center">
                <i className="bi bi-envelope"></i>
                <span className="ms-2">{userData.user.email}</span>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xs="auto" className="d-flex align-items-center">
                <i className="bi bi-telephone"></i>
                <span className="ms-2">{userData.user.phone}</span>
              </Col>
            </Row>
            <Row>
              <Col xs="auto" className="d-flex align-items-center">
                <i className="bi bi-geo-alt"></i>
                <span className="ms-2">
                  {(userData.user.address?.city_state || "") +
                    ", " +
                    (userData.user.address?.country || "")}
                </span>
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
                  className="text-dark fs-5"
                >
                  Snapshot
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className="me-2 me-md-5">
                <Nav.Link
                  eventKey="/job-search-cv"
                  className="text-dark fs-5"
                >
                  JobSearch Resume
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
