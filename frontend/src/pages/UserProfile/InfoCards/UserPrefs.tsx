import {useContext, useState} from "react";
import {Button, Card, Col, Form, ListGroup, Modal, Row} from "react-bootstrap";
import {IJobPreference} from "../../../interfaces/userinfo.ts";
import {EditingContext} from "../MainUserProfile/UserProfile.tsx";

interface UserJobPreferenceProps {
    userJobPreferenceList: IJobPreference[] | undefined;
    onJobPreferenceChange: (updatedJobPreference: IJobPreference[]) => void;
}

const UserJobPreference = ({userJobPreferenceList, onJobPreferenceChange}: UserJobPreferenceProps) => {
    const isEditting = useContext(EditingContext);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newJobPreference, setNewJobPreference] = useState<IJobPreference>({
        job_title: "",
        industry: "",
        relocate_preference: "",
    });

    const handleAddJobPreference = () => {
        if (userJobPreferenceList) {
            onJobPreferenceChange([...userJobPreferenceList, newJobPreference]);
        } else {
            onJobPreferenceChange([newJobPreference]);
        }
        setShowAddForm(false);
        setNewJobPreference({
            job_title: "",
            industry: "",
            relocate_preference: "",
        });
    };

    const handleRemoveJobPreference = (index: number) => {
        if (userJobPreferenceList) {
            const updatedList = userJobPreferenceList.filter((_, i) => i !== index);
            onJobPreferenceChange(updatedList);
        }
    };

    return (
        <>
            <Card className="p-3 mb-3 border-0">
                <Card.Header as="h5">Job Preferences</Card.Header>
                <Card.Body>
                    {userJobPreferenceList && userJobPreferenceList.length > 0 ? (
                        <ListGroup variant="flush">
                            {userJobPreferenceList.map((preference, index) => (
                                <ListGroup.Item key={index} className="d-flex flex-column">
                                    <Row>
                                        <Col xs={12} md={9}>
                                            <h6 className="mb-1">{preference.job_title}</h6>
                                            <p className="mb-1">
                                                <strong>Industry:</strong> {preference.industry}
                                            </p>
                                            <p className="mb-1">
                                                <strong>Relocation:</strong> {preference.relocate_preference}
                                            </p>
                                            {preference.salary_expectation && (
                                                <p className="mb-1">
                                                    <strong>Expected Salary:</strong> ${preference.salary_expectation}
                                                </p>
                                            )}
                                        </Col>
                                        <Col xs={12} md={3} className="text-md-end mt-2 mt-md-0">
                                            {isEditting && (
                                                <i className="bi bi-trash text-danger fs-4"
                                                   onClick={() => handleRemoveJobPreference(index)}
                                                ></i>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p className="text-muted">No job preferences available</p>
                    )}
                </Card.Body>
                {isEditting && (
                    <Card.Footer>
                        <Button variant="primary" onClick={() => setShowAddForm(true)}>
                            Add Job Preference
                        </Button>
                    </Card.Footer>
                )}
            </Card>

            <Modal show={showAddForm} onHide={() => setShowAddForm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Job Preference</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter desired job title"
                                value={newJobPreference.job_title}
                                onChange={(e) =>
                                    setNewJobPreference({...newJobPreference, job_title: e.target.value})
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Industry</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter preferred industry"
                                value={newJobPreference.industry}
                                onChange={(e) =>
                                    setNewJobPreference({...newJobPreference, industry: e.target.value})
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Relocation Preference</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter relocation preference"
                                value={newJobPreference.relocate_preference}
                                onChange={(e) =>
                                    setNewJobPreference({
                                        ...newJobPreference,
                                        relocate_preference: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Expected Salary</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter expected salary (optional)"
                                value={newJobPreference.salary_expectation || ""}
                                onChange={(e) =>
                                    setNewJobPreference({
                                        ...newJobPreference,
                                        salary_expectation: e.target.value ? Number(e.target.value) : undefined,
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
                    <Button variant="primary" onClick={handleAddJobPreference}>
                        Add Job Preference
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserJobPreference;