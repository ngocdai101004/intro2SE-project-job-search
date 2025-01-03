import React from 'react';
import { Card } from 'react-bootstrap';
import { IExperience } from '../../../interfaces/userinfo';

interface ExperienceSectionProps {
    experiences?: IExperience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
    return (
        <Card className="p-3 mb-3 border-0 shadow-sm" style={{ maxWidth: '95%', margin: '0 auto' }}>
            <h5>Work Experience</h5>
            <div className="border rounded p-3 bg-light">
            {experiences && experiences.length > 0 ? (
                experiences.map((experience, index) => (
                <React.Fragment key={index}>
                    <Card className="mb-3">
                    <Card.Body>
                        <h6>{experience.job_title} at {experience.company_name}</h6>
                        <p style={{ fontSize: '0.8rem' }}>
                        {new Date(experience.begin).toLocaleString('default', { 
                            month: 'long', 
                            year: 'numeric' 
                        })} - {
                            experience.end 
                            ? new Date(experience.end).toLocaleString('default', { 
                                month: 'long', 
                                year: 'numeric' 
                              }) 
                            : "Present"
                        }
                        </p>
                        <p>{experience.description}</p>
                    </Card.Body>
                    </Card>
                    {index < experiences.length - 1 && <hr />}
                </React.Fragment>
                ))
            ) : (
                <p>No work experience provided</p>
            )}
            </div>
        </Card>
    );
};

export default ExperienceSection;