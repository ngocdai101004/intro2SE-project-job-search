import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { IExperience } from '../../../interfaces/userinfo';

interface ExperienceProps {
    experience: IExperience[];
    setExperience: (experience: IExperience[]) => void;
}

const Experience: React.FC<ExperienceProps> = ({ experience, setExperience }) => {
    const [warning, setWarning] = useState<string | null>(null);

    const addExperience = () => {
        setExperience([
            ...experience,
            {
                job_title: '',
                company_name: '',
                begin: new Date(),
                end: undefined,
                description: ''
            }
        ]);
    };

    const removeExperience = (index: number) => {
        const newExperience = experience.filter((_, i) => i !== index);
        setExperience(newExperience);
    };

    const updateExperience = (index: number, field: string, value: string | Date | undefined) => {
        if (field === 'begin' || field === 'end') {
            const dateValue = new Date(value as string);
            if (isNaN(dateValue.getTime())) {
                setWarning('Invalid date value');
                return;
            } else {
                setWarning(null);
            }
        }
        const newExperience = [...experience];
        newExperience[index] = { ...newExperience[index], [field]: value };
        setExperience(newExperience);
    };

    return (
        <div className="bg-light p-4">
            <h4 className="mb-4">Work Experience</h4>
            {warning && <Alert variant="warning">{warning}</Alert>}
            {experience.map((exp, index) => (
                <div key={index} className="mb-4 p-3 border rounded position-relative">
                    <Button 
                        variant="link" 
                        className="position-absolute top-0 end-0 text-danger"
                        onClick={() => removeExperience(index)}
                    >
                        Remove
                    </Button>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Job Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={exp.job_title}
                                    onChange={(e) => updateExperience(index, 'job_title', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={exp.company_name}
                                    onChange={(e) => updateExperience(index, 'company_name', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={exp.begin ? new Date(exp.begin).toISOString().split('T')[0] : ''}
                                    onChange={(e) => updateExperience(index, 'begin', e.target.value ? new Date(e.target.value) : undefined)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={exp.end ? new Date(exp.end).toISOString().split('T')[0] : ''}
                                    onChange={(e) => updateExperience(index, 'end', e.target.value ? new Date(e.target.value) : undefined)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                        />
                    </Form.Group>
                </div>
            ))}
            <Button variant="outline-primary" onClick={addExperience}>
                Add Experience
            </Button>
        </div>
    );
};

export default Experience;