// QualificationSection.tsx
// CertificationSection.tsx
import {useContext, useState} from "react";
import {Button, Card, Col, Form, ListGroup, Modal, Row} from "react-bootstrap";
import {IPublication} from "../../../interfaces/userinfo.ts";
import {EditingContext} from "../MainUserProfile/UserProfile.tsx";

interface UserPublicationProps {
    userPublicationList: IPublication[] | undefined;
    onPublicationChange: (updatedPublication: IPublication[]) => void;
}

const UserPublication = ({userPublicationList, onPublicationChange}: UserPublicationProps) => {
    const isEditting = useContext(EditingContext);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newPublication, setNewPublication] = useState<IPublication>({
        title: "",
    });

    const handleAddPublication = () => {
        if (userPublicationList) {
            onPublicationChange([...userPublicationList, newPublication]);
        } else {
            onPublicationChange([newPublication]);
        }
        setShowAddForm(false);
        setNewPublication({
            title: "",
        });
    };

    const handleRemovePublication = (index: number) => {
        if (userPublicationList) {
            const updatedList = userPublicationList.filter((_, i) => i !== index);
            onPublicationChange(updatedList);
        }
    };

    return (
        <>
            <Card className="p-3 mb-3 border-0">
                <Card.Header as="h5">Publications</Card.Header>
                <Card.Body>
                    {userPublicationList && userPublicationList.length > 0 ? (
                        <ListGroup variant="flush">
                            {userPublicationList.map((publication, index) => (
                                <ListGroup.Item key={index} className="d-flex flex-column">
                                    <Row>
                                        <Col xs={12} md={9}>
                                            <h6 className="mb-1">{publication.title}</h6>
                                            {publication.url && (
                                                <p className="mb-1">
                                                    <a href={publication.url} target="_blank" rel="noopener noreferrer">
                                                        View Publication
                                                    </a>
                                                </p>
                                            )}
                                            {publication.description && (
                                                <p className="text-muted">{publication.description}</p>
                                            )}
                                        </Col>
                                        <Col xs={12} md={3} className="text-md-end mt-2 mt-md-0">
                                            {isEditting && (
                                                <i className="bi bi-trash text-danger fs-4"
                                                   onClick={() => handleRemovePublication(index)}
                                                ></i>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p className="text-muted">No publications available</p>
                    )}
                </Card.Body>
                {isEditting && (
                    <Card.Footer>
                        <Button variant="primary" onClick={() => setShowAddForm(true)}>
                            Add Publication
                        </Button>
                    </Card.Footer>
                )}
            </Card>

            <Modal show={showAddForm} onHide={() => setShowAddForm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Publication</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter publication title"
                                value={newPublication.title}
                                onChange={(e) =>
                                    setNewPublication({...newPublication, title: e.target.value})
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                type="url"
                                placeholder="Enter publication URL (optional)"
                                value={newPublication.url || ""}
                                onChange={(e) =>
                                    setNewPublication({...newPublication, url: e.target.value})
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description (optional)"
                                value={newPublication.description || ""}
                                onChange={(e) =>
                                    setNewPublication({...newPublication, description: e.target.value})
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddPublication}>
                        Add Publication
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserPublication;