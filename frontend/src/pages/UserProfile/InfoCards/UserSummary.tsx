import {useContext, useState} from "react";
import {Button, Card, Form, Modal} from "react-bootstrap";
import {EditingContext} from "../MainUserProfile/UserProfile.tsx";

interface UserSummaryProps {
    summary: string;
    onSummaryChange: (newSummary: string) => void;
}

const UserSummary = ({summary, onSummaryChange}: UserSummaryProps) => {
    const isEditting = useContext(EditingContext);
    const [showEditForm, setShowEditForm] = useState(false);
    const [newSummary, setNewSummary] = useState(summary);

    const handleSaveChanges = () => {
        onSummaryChange(newSummary.trim());
        setShowEditForm(false);
    };

    return (
        <>
            <Card className="shadow-sm rounded-3 border-0 mb-4">
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Summary</h5>
                    {isEditting && (
                        <Button
                            variant="light"
                            size="sm"
                            onClick={() => setShowEditForm(true)}
                            className="d-flex align-items-center"
                        >
                            <i className="bi bi-pencil me-2"></i>Edit
                        </Button>
                    )}
                </Card.Header>
                <Card.Body className="bg-light">
                    <Card.Text className="text-muted">{summary || "No summary available yet."}</Card.Text>
                </Card.Body>
            </Card>

            <Modal show={showEditForm} onHide={() => setShowEditForm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Summary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Your Summary</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={newSummary}
                                onChange={(e) => setNewSummary(e.target.value)}
                                placeholder="Write a brief summary about yourself..."
                                className="rounded-3 shadow-sm"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditForm(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSaveChanges}
                        disabled={!newSummary.trim()}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserSummary;
