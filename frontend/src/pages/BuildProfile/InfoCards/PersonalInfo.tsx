import React, { useState } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import { IUser } from '../../../interfaces/user';

interface Props {
    gender?: "male" | "female";
    dateOfBirth?: Date;
    shortBio?: string;
    onChange: (field: keyof IUser, value: string | Date) => void;
}

const PersonalInfo: React.FC<Props> = ({ gender, dateOfBirth, shortBio, onChange }) => {
    const [bioError, setBioError] = useState<string | null>(null);
    const [dateError, setDateError] = useState<string | null>(null);

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const bio = e.target.value;
        if (bio.length > 100) {
            setBioError('Bio cannot exceed 100 characters');
        } else {
            setBioError(null);
            onChange('short_bio', bio);
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = new Date(e.target.value);
        if (isNaN(dateValue.getTime())) {
            setDateError('Invalid date value');
        } else {
            setDateError(null);
            onChange('date_of_birth', dateValue);
        }
    };

    return (
        <div>
            <h4>Personal Information</h4>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                            value={gender}
                            onChange={(e) => onChange('gender', e.target.value)}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            value={dateOfBirth ? new Date(dateOfBirth).toISOString().split('T')[0] : ''}
                            onChange={handleDateChange}
                        />
                        {dateError && <Alert variant="danger" className="mt-2">{dateError}</Alert>}
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Short Bio</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    value={shortBio}
                    onChange={handleBioChange}
                />
                {bioError && <Alert variant="danger" className="mt-1" style={{ height: '15px' }}>{bioError}</Alert>}
            </Form.Group>
        </div>
    );
};

export default PersonalInfo;