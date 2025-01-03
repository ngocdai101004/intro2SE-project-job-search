import React from 'react';
import { Card } from 'react-bootstrap';
import { ICertification } from '../../../interfaces/userinfo';

interface CertificationsSectionProps {
    certifications?: ICertification[];
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
    return (
        <Card className="p-3 mb-3 border-0 shadow-sm" style={{ maxWidth: '95%', margin: '0 auto' }}>
            <h5>Certifications and Licenses</h5>
            <div className="border rounded p-3 bg-light">
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                {certifications && certifications.length > 0 ? (
                certifications.map((certification, index) => (
                    <React.Fragment key={index}>
                    <li style={{ marginBottom: '1rem' }}>
                        <h6>{certification.name}</h6>
                        <p style={{ fontSize: '0.8rem' }}>
                        <strong>Issuing Organization:</strong> {certification.issuing_organization}<br />
                        <strong>Issue Date:</strong> {
                            new Date(certification.issue_date).toLocaleString('default', { 
                            month: 'long', 
                            year: 'numeric' 
                            })
                        }
                        </p>
                    </li>
                    {index < certifications.length - 1 && <hr />}
                    </React.Fragment>
                ))
                ) : (
                <p>No certifications or licenses provided</p>
                )}
            </ul>
            </div>
        </Card>
    );
};

export default CertificationsSection;