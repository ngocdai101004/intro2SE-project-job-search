import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { IUser } from '../../../interfaces/user';
import { toast } from 'react-toastify';
import { MyToastContainer } from '../../../components/MyToastContainer';

interface Props {
    gender?: "male" | "female";
    dateOfBirth?: Date;
    shortBio?: string;
    onChange: (field: keyof IUser, value: string | Date) => void;
}

const PersonalInfo: React.FC<Props> = ({ gender, dateOfBirth, shortBio, onChange }) => {
    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const bio = e.target.value;
        if (bio.length > 100) {
            toast.error('Bio cannot exceed 100 characters');
        } else {
            onChange('short_bio', bio);
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
                            onChange={(e) => onChange('date_of_birth', new Date(e.target.value))}
                        />
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
            </Form.Group>
            <MyToastContainer />
        </div>
    );
};

export default PersonalInfo;