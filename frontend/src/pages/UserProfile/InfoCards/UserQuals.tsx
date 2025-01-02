import {useContext, useState} from "react";
import {Button, Card, Col, Form, ListGroup, Modal, Row} from "react-bootstrap";
import {IQualification} from "../../../interfaces/userinfo.ts";
import {EditingContext} from "../MainUserProfile/UserProfile.tsx";

interface UserQualificationProps {
    userQualificationList: IQualification[] | undefined;
    onQualificationChange: (updatedQualification: IQualification[]) => void;
}

const UserQualification = ({userQualificationList, onQualificationChange}: UserQualificationProps) => {
    const isEditting = useContext(EditingContext);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newQualification, setNewQualification] = useState<IQualification>({
        title: "",
    });

    const handleAddQualification = () => {
        if (userQualificationList) {
            onQualificationChange([...userQualificationList, newQualification]);
        } else {
            onQualificationChange([newQualification]);
        }
        setShowAddForm(false);
        setNewQualification({
            title: "",
        });
    };

    const handleRemoveQualification = (index: number) => {
        if (userQualificationList) {
            const updatedList = userQualificationList.filter((_, i) => i !== index);
            onQualificationChange(updatedList);
        }
    };

    return (
        <>
            <Card className="p-3 mb-3 border-0">
                <Card.Header as="h5">Qualifications</Card.Header>
                <Card.Body>
                    {userQualificationList && userQualificationList.length > 0 ? (
                        <ListGroup variant="flush">
                            {userQualificationList.map((qualification, index) => (
                                <ListGroup.Item key={index} className="d-flex flex-column">
                                    <Row>
                                        <Col xs={12} md={9}>
                                            <h6 className="mb-1">{qualification.title}</h6>
                                            {qualification.description && (
                                                <p className="text-muted">{qualification.description}</p>
                                            )}
                                        </Col>
                                        <Col xs={12} md={3} className="text-md-end mt-2 mt-md-0">
                                            {isEditting && (
                                                <i className="bi bi-trash text-danger fs-4"
                                                   onClick={() => handleRemoveQualification(index)}
                                                ></i>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p className="text-muted">No qualifications available</p>
                    )}
                </Card.Body>
                {isEditting && (
                    <Card.Footer>
                        <Button variant="primary" onClick={() => setShowAddForm(true)}>
                            Add Qualification
                        </Button>
                    </Card.Footer>
                )}
            </Card>

            <Modal show={showAddForm} onHide={() => setShowAddForm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Qualification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter qualification title"
                                value={newQualification.title}
                                onChange={(e) =>
                                    setNewQualification({...newQualification, title: e.target.value})
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description (optional)"
                                value={newQualification.description || ""}
                                onChange={(e) =>
                                    setNewQualification({...newQualification, description: e.target.value})
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddQualification}>
                        Add Qualification
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserQualification;
