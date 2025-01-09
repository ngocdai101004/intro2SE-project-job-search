import React, { useState } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';

interface Props {
    firstName?: string;
    lastName?: string;
    gender?: "male" | "female";
    dateOfBirth?: Date;
    shortBio?: string;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setGender: (gender: 'male' | 'female') => void;
    setDateOfBirth: (dateOfBirth: Date) => void;
    setShortBio: (shortBio: string) => void;   
}

const PersonalInfo: React.FC<Props> = ({ firstName, lastName, gender, dateOfBirth, shortBio, setFirstName, setLastName, setGender, setDateOfBirth, setShortBio }) => {
    const [bioError, setBioError] = useState<string | null>(null);
    const [dateError, setDateError] = useState<string | null>(null);
    console.log("Date of Birth", dateOfBirth);

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const bio = e.target.value;
        if (bio.length > 200) {
            setBioError('Bio cannot exceed 200 characters');
        } else {
            setBioError(null);
            setShortBio(bio);
        }
    };

    const handleDateChange = (value: string) => {
        console.log("Date of Birth as String", value);
        const dateValue = new Date(value);
        if (isNaN(dateValue.getTime())) {
            setDateError('Invalid date value');
        } else {
            setDateError(null);
            setDateOfBirth(dateValue);
        }
    };

    return (
        <div>
            <h4>Personal Information</h4>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                            value={gender}
                            onChange={(e) => setGender(e.target.value as 'male' | 'female')}
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
                            value={dateOfBirth instanceof Date ? dateOfBirth.toISOString().split('T')[0] : ''}
                            onChange={(e) => handleDateChange(e.target.value)}
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