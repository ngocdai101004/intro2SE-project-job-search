import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { IQualification } from '../../../interfaces/userinfo';

interface QualificationsSectionProps {
    qualifications?: IQualification[];
}

const QualificationsSection: React.FC<QualificationsSectionProps> = ({ qualifications }) => {
    return (
        <Card className="p-3 mb-3 border-0 shadow-sm" style={{ maxWidth: '95%', margin: '0 auto' }}>
            <h5>Qualifications</h5>
            <div className="border rounded p-3 bg-light">
                <Row>
                    {qualifications && qualifications.map((qualification, index) => (
                        <React.Fragment key={index}>
                            <Col md={12} className="mb-3" >
                                <p style={{ margin: '0rem 0.5rem 0.5rem 0.5rem' }}>
                                    <strong>{qualification.title}</strong>: 
                                    {qualification.description || "No description provided"}
                                </p>
                            </Col>
                            {index < qualifications.length - 1 && <hr />}
                        </React.Fragment>
                    ))}
                </Row>
            </div>
        </Card>
    );
};

export default QualificationsSection;