import React from "react";
import {Button, Card, Col, Image, Modal, Nav, Row} from "react-bootstrap";
import IUser from "../../../interfaces/user";
import { useState, useEffect } from "react";
import axiosInstance from "../../../common/axiosInstance";
import UserProfileForm from "../../BuildProfile/UserProfileForm";

interface UserHeaderProps {
  myState?: string;
  setMyState?: React.Dispatch<React.SetStateAction<string>>;
  userID?: string | null;
}


const UserHeader = ({ myState, setMyState, userID }: UserHeaderProps) => {
  const myActiveKey = myState || "/snapshot";
  const setMyActiveKey = setMyState || (() => {});
  const [user, setUser] = useState<IUser>();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
      const fetchUserInfo = async () => {
          try {
              console.log("userID", userID);
              const response = userID
                  ? await axiosInstance.get(`/user/${userID}/profile`)
                  : await axiosInstance.get("/user/profile");
              setUser(response.data.data.user);
          } catch (error) {
              console.error("Error fetching user data:", error);
          }
      };
      fetchUserInfo();
  }, [showModal, userID]);

  
  return (
    <div className="bg-cyan py-3 pb-0">
      <div className="container position-relative" style={{width: '70%'}}>
        {/* Header Section */}
        <div className="row">
          <Card
            className="col-auto d-flex mb-3 mb-md-0"
            style={{ backgroundColor: "#00000000", border: "none" }}
          >
            <Row>
              <Col xs="auto" className="d-flex justify-content-center">
                <Image
                  src= {user?.avatar || "https://via.placeholder.com/150"}
                  roundedCircle
                  style={{ width: "80px", height: "80px" }}
                />
              </Col>
              <Col className="d-flex flex-column justify-content-center">
                <h5 className="mb-1">
                  {(user?.first_name || "") +
                    " " +
                    (user?.last_name || "") || "Company"}
                </h5>
                <small
                  className="text-muted"
                  style={{ wordWrap: "break-word", maxWidth: "300px" }}
                >
                  {user?.short_bio || "User Bio"}
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
                <span className="ms-2">{user?.email}</span>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xs="auto" className="d-flex align-items-center">
                <i className="bi bi-telephone"></i>
                <span className="ms-2">{user?.phone}</span>
              </Col>
            </Row>
            <Row>
              <Col xs="auto" className="d-flex align-items-center">
                <i className="bi bi-geo-alt"></i>
                <span className="ms-2">
                  {(user?.address?.city_state || "") +
                    ", " +
                    (user?.address?.country || "")}
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


        {!userID && (
                    <Button
                        variant="link"
                        className="position-absolute"
                        style={{
                            bottom: "10px",
                            right: "10px",
                            padding: "0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onClick={() => setShowModal(true)}
                    >
                        <i className="bi bi-pencil" style={{fontSize: "1.2rem"}}></i>
                    </Button>
                )}
                {/* Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)} centered size="xl" style={{ height: "70%", marginTop: "10%" }}>
                    <Modal.Header closeButton style={{ backgroundColor: "#f8f9fa", position: "sticky", top: "0", zIndex: 1 }}>
                        <Modal.Title>Edit User Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <UserProfileForm/>
                    </Modal.Body>
                </Modal>
      </div>
    </div>
  );
};

export default UserHeader;
