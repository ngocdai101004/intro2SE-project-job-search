import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { BuildJobSearhCVProps } from '../../../interfaces/userinfo';
import { IEducation } from '../../../interfaces/userinfo';

const Education: React.FC<BuildJobSearhCVProps> = ({ data, setData }) => {
    const [error, setError] = useState<string | null>(null);

    const addEducation = () => {
        setData({
            ...data,
            education: [...data.education, {
                education_level: '',
                study_field: '',
                school_name: '',
                begin: new Date(),
                end: undefined,
                additional_details: ''
            }]
        });
    };

    const updateEducation = (index: number, field: string, value: string | Date) => {
        const newEducation = [...data.education];
        newEducation[index] = { ...newEducation[index], [field]: value };
        setData({ ...data, education: newEducation });
    };

    const handleDateChange = (index: number, field: string, value: string) => {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                setError('Invalid date value');
            } else {
                setError(null);
                updateEducation(index, field, date);
            }
        };

    const removeEducation = (index: number) => {
        const newEducation = data.education.filter((_, i) => i !== index);
        setData({ ...data, education: newEducation });
    };

    return (
        <div className="bg-light p-4">
            <h4>Education</h4>
            {error && <Alert variant="warning">{error}</Alert>}
            {data.education.map((edu: IEducation, index: number) => (
                <div key={index} className="mb-4 p-3 border rounded bg-white position-relative">
                    <Button 
                        variant="link" 
                        className="position-absolute top-0 end-0 text-danger"
                        onClick={() => removeEducation(index)}>
                        Remove
                    </Button>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Education Level</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={edu.education_level}
                                    onChange={(e) => updateEducation(index, 'education_level', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Field of Study</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={edu.study_field}
                                    onChange={(e) => updateEducation(index, 'study_field', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>School Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={edu.school_name}
                                    onChange={(e) => updateEducation(index, 'school_name', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Begin Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={edu.begin instanceof Date ? edu.begin.toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleDateChange(index, 'begin', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={edu.end instanceof Date ? edu.end.toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleDateChange(index, 'end', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Additional Details</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={edu.additional_details}
                                    onChange={(e) => updateEducation(index, 'additional_details', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            ))}
            <Button variant="outline-primary" onClick={addEducation}>
                Add Education
            </Button>
        </div>
    );
};

export default Education;