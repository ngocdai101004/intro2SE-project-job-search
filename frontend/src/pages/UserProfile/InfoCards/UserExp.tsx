// ExperienceSection.tsx
import {useContext, useState} from "react";
import {Button, Card, Col, Form, ListGroup, Modal, Row} from "react-bootstrap";
import {IExperience} from "../../../interfaces/userinfo.ts";
import {EditingContext} from "../MainUserProfile/UserProfile.tsx";

interface UserExperienceProps {
    userExperienceList: IExperience[] | undefined;
    onExperienceChange: (updatedExperience: IExperience[]) => void;
}

const UserExperience = ({userExperienceList, onExperienceChange}: UserExperienceProps) => {
    const isEditting = useContext(EditingContext);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newExperience, setNewExperience] = useState<IExperience>({
        job_title: "",
        company_name: "",
        begin: new Date(),
    });

    const handleAddExperience = () => {
        if (userExperienceList) {
            onExperienceChange([...userExperienceList, newExperience]);
        } else {
            onExperienceChange([newExperience]);
        }
        setShowAddForm(false);
        setNewExperience({
            job_title: "",
            company_name: "",
            begin: new Date(),
        });
    };

    const handleRemoveExperience = (index: number) => {
        if (userExperienceList) {
            const updatedList = userExperienceList.filter((_, i) => i !== index);
            onExperienceChange(updatedList);
        }
    };

    return (
        <>
            <Card className="p-3 mb-3 border-0">
                <Card.Header as="h5">Experience</Card.Header>
                <Card.Body>
                    {userExperienceList && userExperienceList.length > 0 ? (
                        <ListGroup variant="flush">
                            {userExperienceList.map((experience, index) => (
                                <ListGroup.Item key={index} className="d-flex flex-column">
                                    <Row>
                                        <Col xs={12} md={9}>
                                            <h6 className="mb-1">{experience.job_title}</h6>
                                            <p className="mb-1">
                                                <strong>{experience.company_name}</strong>
                                            </p>
                                            <p className="mb-1">
                                                {new Date(experience.begin).getFullYear()} -{" "}
                                                {experience.end ? new Date(experience.end).getFullYear() : "Present"}
                                            </p>
                                            {experience.description && (
                                                <p className="text-muted">{experience.description}</p>
                                            )}
                                        </Col>
                                        <Col xs={12} md={3} className="text-md-end mt-2 mt-md-0">
                                            {isEditting && (
                                                <i className="bi bi-trash text-danger fs-4"
                                                   onClick={() => handleRemoveExperience(index)}
                                                ></i>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p className="text-muted">No experience information available</p>
                    )}
                </Card.Body>
                {isEditting && (
                    <Card.Footer>
                        <Button variant="primary" onClick={() => setShowAddForm(true)}>
                            Add Experience
                        </Button>
                    </Card.Footer>
                )}
            </Card>

            <Modal show={showAddForm} onHide={() => setShowAddForm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter job title"
                                value={newExperience.job_title}
                                onChange={(e) =>
                                    setNewExperience({...newExperience, job_title: e.target.value})
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter company name"
                                value={newExperience.company_name}
                                onChange={(e) =>
                                    setNewExperience({...newExperience, company_name: e.target.value})
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={newExperience.begin.toISOString().substring(0, 10)}
                                onChange={(e) =>
                                    setNewExperience({...newExperience, begin: new Date(e.target.value)})
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={newExperience.end?.toISOString().substring(0, 10) || ""}
                                onChange={(e) =>
                                    setNewExperience({
                                        ...newExperience,
                                        end: e.target.value ? new Date(e.target.value) : undefined,
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter job description (optional)"
                                value={newExperience.description || ""}
                                onChange={(e) =>
                                    setNewExperience({...newExperience, description: e.target.value})
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddExperience}>
                        Add Experience
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserExperience;