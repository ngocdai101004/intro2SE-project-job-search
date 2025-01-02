import {useContext, useState} from "react";
import {Button, Card, Col, Form, ListGroup, Modal, Row} from "react-bootstrap";
import {EditingContext} from "../MainUserProfile/UserProfile.tsx";

interface UserCommonInfoProps {
    commonInfoLabel: string;
    userCommonInfoList: string[] | undefined;
    onCommonInfoChange: (updatedCommonInfo: string[]) => void;
}

const UserCommonInfo = ({commonInfoLabel, userCommonInfoList, onCommonInfoChange}: UserCommonInfoProps) => {
    const isEditting = useContext(EditingContext);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCommonInfo, setNewCommonInfo] = useState<string>("");

    const handleAddCommonInfo = () => {
        if (userCommonInfoList) {
            onCommonInfoChange([...userCommonInfoList, newCommonInfo]);
        } else {
            onCommonInfoChange([newCommonInfo]);
        }
        setShowAddForm(false);
        setNewCommonInfo("");
    };

    const handleRemoveCommonInfo = (index: number) => {
        if (userCommonInfoList) {
            const updatedList = userCommonInfoList.filter((_, i) => i !== index);
            onCommonInfoChange(updatedList);
        }
    };

    return (
        <>
            <Card className="p-3 mb-3 border-2">
                <Card.Header as="h5">{commonInfoLabel}</Card.Header>
                <Card.Body>
                    {userCommonInfoList && userCommonInfoList.length > 0 ? (
                        <ListGroup variant="flush">
                            {userCommonInfoList.map((CommonInfo, index) => (
                                <ListGroup.Item key={index} className="d-flex flex-column">
                                    <Row>
                                        <Col xs={12} md={9}>
                                            <h5 className="mb-1">{CommonInfo}</h5>
                                        </Col>
                                        <Col xs={12} md={3} className="text-md-end mt-2 mt-md-0">
                                            {isEditting && (
                                                <i className="bi bi-trash text-danger fs-4"
                                                   onClick={() => handleRemoveCommonInfo(index)}
                                                ></i>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p className="text-muted">No {commonInfoLabel} available</p>
                    )}
                </Card.Body>
                {isEditting && (
                    <Card.Footer>
                        <Button variant="primary" onClick={() => setShowAddForm(true)}>
                            Add {commonInfoLabel}
                        </Button>
                    </Card.Footer>
                )}
            </Card>

            <Modal show={showAddForm} onHide={() => setShowAddForm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add CommonInfo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>{commonInfoLabel}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={`Enter ${commonInfoLabel}`}
                                value={newCommonInfo}
                                onChange={(e) =>
                                    setNewCommonInfo(e.target.value)
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddCommonInfo}>
                        Add {commonInfoLabel}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserCommonInfo;
