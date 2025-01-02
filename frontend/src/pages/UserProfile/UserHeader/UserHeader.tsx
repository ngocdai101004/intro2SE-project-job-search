import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Image, Modal, Nav, Row} from "react-bootstrap";
import axiosInstance from "../../../common/axiosInstance.tsx";
import IUser from "../../../interfaces/user.ts";
import {MyToastContainer} from "../../../components/MyToastContainer.tsx";
import {toast} from "react-toastify";

interface UserHeaderProps {
    myState?: string;
    setMyState?: React.Dispatch<React.SetStateAction<string>>;
    userID: string | null;
}

const UserHeader = ({myState, setMyState, userID}: UserHeaderProps) => {
    const myActiveKey = myState || "/snapshot";
    const setMyActiveKey = setMyState || (() => {
    });


    const [user, setUser] = useState<IUser | null>(null);
    const [showModal, setShowModal] = useState(false);


    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        short_bio: "",
        address: {
            district: "",
            city_state: "",
            country: "",
            zip_code: ""
        },
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                console.log("userID", userID);
                const response = userID
                    ? await axiosInstance.get(`/user/${userID}/profile`)
                    : await axiosInstance.get("/user/profile");
                setUser(response.data.data.user);
                setFormData({
                    first_name: response.data.data.user.first_name,
                    last_name: response.data.data.user.last_name,
                    phone: response.data.data.user.phone,
                    short_bio: response.data.data.user.short_bio,
                    address: response.data.data.user.address
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserInfo();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        const {name, value} = e.target;
        if (field === "address") {
            setFormData(prevState => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [name]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSaveChanges = async () => {
        const toastId = toast.loading('Signing in...');
        try {
            const newUser = {...user, ...formData};
            await axiosInstance.patch("/user/profile", newUser);
            toast.update(toastId, {
                render: "Changes saved successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            setUser(newUser);
            setShowModal(false);
        } catch (error) {
            console.error("Error saving changes:", error);
            toast.update(toastId, {
                render: "An error occurred. Please try again.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };


    return (
        <div className="bg-cyan py-3 pb-0">
            <div className="container position-relative">
                {/* Header Section */}
                <div className="row">
                    <Card
                        className="col-auto d-flex mb-3 mb-md-0"
                        style={{backgroundColor: "#00000000", border: "none"}}
                    >
                        <Row>
                            <Col xs="auto" className="d-flex justify-content-center">
                                <Image
                                    src="\company-avatar.jpg" // Path to the logo
                                    roundedCircle
                                    style={{width: "80px", height: "80px"}}
                                />
                            </Col>
                            <Col className="d-flex flex-column justify-content-center">
                                <h5 className="mb-1">{user?.first_name + " " + user?.last_name}</h5>
                                <small
                                    className="text-muted"
                                    style={{wordWrap: "break-word", maxWidth: "300px"}}
                                >
                                    {user?.short_bio || "No bio provided"}
                                </small>
                            </Col>
                        </Row>
                    </Card>

                    <Card
                        className="col-auto d-flex justify-content-start ms-md-auto"
                        style={{backgroundColor: "#00000000", border: "none"}}
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
                                <span className="ms-2">{user?.phone || "No phone provided"}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="auto" className="d-flex align-items-center">
                                <i className="bi bi-geo-alt"></i>
                                <span className="ms-2">
                                  {(!user || !user?.address) || (!user?.address.district && !user?.address.city_state && !user?.address.country)
                                      ? "No address provided"
                                      : `${user?.address.district}, ${user?.address.city_state}, ${user?.address.country}`}
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

                {/* Edit Icon */}
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
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Page</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    placeholder="Enter first name"
                                    value={formData.first_name}
                                    onChange={(e) => handleChange(e, "general")}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    placeholder="Enter last name"
                                    value={formData.last_name}
                                    onChange={(e) => handleChange(e, "general")}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    placeholder="Enter phone"
                                    value={formData.phone}
                                    onChange={(e) => handleChange(e, "general")}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>District</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="district"
                                    placeholder="Enter district"
                                    value={formData.address.district}
                                    onChange={(e) => handleChange(e, "address")}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>City/State</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city_state"
                                    placeholder="Enter city/state"
                                    value={formData.address.city_state}
                                    onChange={(e) => handleChange(e, "address")}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    placeholder="Enter country"
                                    value={formData.address.country}
                                    onChange={(e) => handleChange(e, "address")}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Short Bio</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="short_bio"
                                    placeholder="Enter short bio"
                                    value={formData.short_bio}
                                    onChange={(e) => handleChange(e, "general")}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <MyToastContainer/>
            </div>
        </div>
    );
};

export default UserHeader;
