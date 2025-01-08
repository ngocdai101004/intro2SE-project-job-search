import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { ICertification } from '../../../interfaces/userinfo';

interface CertificationsProps {
    certifications: ICertification[];
    setCertifications: (certifications: ICertification[]) => void;
}

const Certifications: React.FC<CertificationsProps> = ({ certifications, setCertifications }) => {
    const [warning, setWarning] = useState<string | null>(null);

    const addCertification = () => {
        setCertifications([
            ...certifications,
            {
                name: '',
                issuing_organization: '',
                issue_date: new Date()
            }
        ]);
    };

    const removeCertification = (index: number) => {
        const newCertifications = certifications.filter((_, i) => i !== index);
        setCertifications(newCertifications);
    };

    const updateCertification = (index: number, field: string, value: string | Date) => {
        if (field === 'issue_date') {
            const dateValue = new Date(value as string);
            if (isNaN(dateValue.getTime())) {
                setWarning('Invalid date value');
                return;
            } else {
                setWarning(null);
            }
        }
        const newCertifications = [...certifications];
        newCertifications[index] = { ...newCertifications[index], [field]: value };
        setCertifications(newCertifications);
    };

    return (
        <div className="bg-light p-4">
            <h4 className="mb-4">Certifications</h4>
            {warning && <Alert variant="warning">{warning}</Alert>}
            {certifications.map((cert, index) => (
                <div key={index} className="mb-4 p-3 border rounded position-relative">
                    <Button 
                        variant="link" 
                        className="position-absolute top-0 end-0 text-danger"
                        onClick={() => removeCertification(index)}
                    >
                        Remove
                    </Button>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={cert.name}
                            onChange={(e) => updateCertification(index, 'name', e.target.value as string)}
                            placeholder="e.g., Certified Scrum Master"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Issuing Organization</Form.Label>
                        <Form.Control
                            type="text"
                            value={cert.issuing_organization}
                            onChange={(e) => updateCertification(index, 'issuing_organization', e.target.value as string)}
                            placeholder="e.g., Scrum Alliance"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Issue Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={cert.issue_date.toISOString().split('T')[0]}
                            onChange={(e) => updateCertification(index, 'issue_date', new Date(e.target.value) as Date)}
                        />
                    </Form.Group>
                </div>
            ))}
            <Button variant="outline-primary" onClick={addCertification}>
                Add Certification
            </Button>
        </div>
    );
};

export default Certifications;