import {useContext, useState} from "react";
import {Button, Card, Col, Form, ListGroup, Modal, Row} from "react-bootstrap";
import {ICertification} from "../../../interfaces/userinfo.ts";
import {EditingContext} from "../MainUserProfile/UserProfile.tsx";

interface UserCertificationProps {
    userCertificationList: ICertification[] | undefined;
    onCertificationChange: (updatedCertification: ICertification[]) => void;
}

const UserCertification = ({userCertificationList, onCertificationChange}: UserCertificationProps) => {
    const isEditting = useContext(EditingContext);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCertification, setNewCertification] = useState<ICertification>({
        name: "",
        issuing_organization: "",
        issue_date: new Date(),
    });

    const handleAddCertification = () => {
        if (userCertificationList) {
            onCertificationChange([...userCertificationList, newCertification]);
        } else {
            onCertificationChange([newCertification]);
        }
        setShowAddForm(false);
        setNewCertification({
            name: "",
            issuing_organization: "",
            issue_date: new Date(),
        });
    };

    const handleRemoveCertification = (index: number) => {
        if (userCertificationList) {
            const updatedList = userCertificationList.filter((_, i) => i !== index);
            onCertificationChange(updatedList);
        }
    };

    return (
        <>
            <Card className="p-3 mb-3 border-0">
                <Card.Header as="h5">Certifications</Card.Header>
                <Card.Body>
                    {userCertificationList && userCertificationList.length > 0 ? (
                        <ListGroup variant="flush">
                            {userCertificationList.map((certification, index) => (
                                <ListGroup.Item key={index} className="d-flex flex-column">
                                    <Row>
                                        <Col xs={12} md={9}>
                                            <h6 className="mb-1">{certification.name}</h6>
                                            <p className="mb-1">
                                                <strong>Issuing
                                                    Organization:</strong> {certification.issuing_organization}
                                            </p>
                                            <p className="mb-1">
                                                <strong>Issue Date:</strong>{" "}
                                                {new Date(certification.issue_date).toLocaleDateString()}
                                            </p>
                                        </Col>
                                        <Col xs={12} md={3} className="text-md-end mt-2 mt-md-0">
                                            {isEditting && (
                                                <i className="bi bi-trash text-danger fs-4"
                                                   onClick={() => handleRemoveCertification(index)}
                                                ></i>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p className="text-muted">No certifications available</p>
                    )}
                </Card.Body>
                {isEditting && (
                    <Card.Footer>
                        <Button variant="primary" onClick={() => setShowAddForm(true)}>
                            Add Certification
                        </Button>
                    </Card.Footer>
                )}
            </Card>

            <Modal show={showAddForm} onHide={() => setShowAddForm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Certification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Certification Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter certification name"
                                value={newCertification.name}
                                onChange={(e) =>
                                    setNewCertification({...newCertification, name: e.target.value})
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Issuing Organization</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter issuing organization"
                                value={newCertification.issuing_organization}
                                onChange={(e) =>
                                    setNewCertification({
                                        ...newCertification,
                                        issuing_organization: e.target.value
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Issue Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={newCertification.issue_date.toISOString().substring(0, 10)}
                                onChange={(e) =>
                                    setNewCertification({
                                        ...newCertification,
                                        issue_date: new Date(e.target.value)
                                    })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddCertification}>
                        Add Certification
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserCertification;