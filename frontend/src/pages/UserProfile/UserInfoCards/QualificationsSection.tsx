import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { IQualification } from '../../../interfaces/userinfo';

interface QualificationsSectionProps {
    qualifications?: IQualification[];
}

const QualificationsSection: React.FC<QualificationsSectionProps> = ({ qualifications }) => {
    return (
        <Card className="p-3 mb-3 border-0">
            <h5>Qualifications</h5>
            <div className="border rounded p-3">
                <Row>
                    {qualifications && qualifications.map((qualification, index) => (
                        <Col md={6} key={index}>
                            <p>
                                <strong>{qualification.title}</strong>: 
                                {qualification.description || "No description provided"}
                            </p>
                        </Col>
                    ))}
                </Row>
            </div>
        </Card>
    );
};

export default QualificationsSection;