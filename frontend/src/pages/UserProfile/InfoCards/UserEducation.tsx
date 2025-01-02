import {useContext, useState} from "react";
import {Button, Card, Col, Form, ListGroup, Modal, Row} from "react-bootstrap";
import {EditingContext} from "../MainUserProfile/UserProfile.tsx";

export interface IEducation {
    education_level: string;
    study_field: string;
    school_name: string;
    begin: Date;
    end?: Date;
    additional_details?: string;
}

interface UserEducationProps {
    userEducationList: IEducation[] | undefined;
    onEducationChange: (updatedEducation: IEducation[]) => void;
}

const UserEducation = ({userEducationList, onEducationChange}: UserEducationProps) => {
    const isEditting = useContext(EditingContext);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newEducation, setNewEducation] = useState<IEducation>({
        education_level: "",
        study_field: "",
        school_name: "",
        begin: new Date(),
    });

    const handleAddEducation = () => {
        if (userEducationList) {
            onEducationChange([...userEducationList, newEducation]);
        } else {
            onEducationChange([newEducation]);
        }
        setShowAddForm(false);
        setNewEducation({
            education_level: "",
            study_field: "",
            school_name: "",
            begin: new Date(),
        });
    };

    const handleRemoveEducation = (index: number) => {
        if (userEducationList) {
            const updatedList = userEducationList.filter((_, i) => i !== index);
            onEducationChange(updatedList);
        }
    };

    return (
        <>
            <Card className="p-3 mb-3 border-0">
                <Card.Header as="h5">Education</Card.Header>
                <Card.Body>
                    {userEducationList && userEducationList.length > 0 ? (
                        <ListGroup variant="flush">
                            {userEducationList.map((education, index) => (
                                <ListGroup.Item key={index} className="d-flex flex-column">
                                    <Row>
                                        <Col xs={12} md={9}>
                                            <h6 className="mb-1">{education.school_name}</h6>
                                            <p className="mb-1">
                                                <strong>{education.education_level}</strong> in {education.study_field}
                                            </p>
                                            <p className="mb-1">
                                                {new Date(education.begin).getFullYear()} -{" "}
                                                {education.end ? new Date(education.end).getFullYear() : "Present"}
                                            </p>
                                            {education.additional_details && (
                                                <p className="text-muted">{education.additional_details}</p>
                                            )}
                                        </Col>
                                        <Col xs={12} md={3} className="text-md-end mt-2 mt-md-0">
                                            {isEditting && (
                                                <i className="bi bi-trash text-danger fs-4"
                                                   onClick={() => handleRemoveEducation(index)}
                                                ></i>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p className="text-muted">No education information available</p>
                    )}
                </Card.Body>
                {isEditting && (
                    <Card.Footer>
                        <Button variant="primary" onClick={() => setShowAddForm(true)}>
                            Add Education
                        </Button>
                    </Card.Footer>
                )}
            </Card>

            <Modal show={showAddForm} onHide={() => setShowAddForm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Education</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>School Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter school name"
                                value={newEducation.school_name}
                                onChange={(e) =>
                                    setNewEducation({...newEducation, school_name: e.target.value})
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Education Level</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter education level"
                                value={newEducation.education_level}
                                onChange={(e) =>
                                    setNewEducation({...newEducation, education_level: e.target.value})
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Field of Study</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter field of study"
                                value={newEducation.study_field}
                                onChange={(e) =>
                                    setNewEducation({...newEducation, study_field: e.target.value})
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={newEducation.begin.toISOString().substring(0, 10)}
                                onChange={(e) =>
                                    setNewEducation({...newEducation, begin: new Date(e.target.value)})
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={newEducation.end?.toISOString().substring(0, 10) || ""}
                                onChange={(e) =>
                                    setNewEducation({
                                        ...newEducation,
                                        end: e.target.value ? new Date(e.target.value) : undefined,
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Additional Details</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter additional details (optional)"
                                value={newEducation.additional_details || ""}
                                onChange={(e) =>
                                    setNewEducation({...newEducation, additional_details: e.target.value})
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddEducation}>
                        Add Education
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserEducation;
