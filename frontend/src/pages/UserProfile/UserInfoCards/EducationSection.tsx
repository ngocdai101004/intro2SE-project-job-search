import React from 'react';
import { Card } from 'react-bootstrap';
import { IEducation } from '../../../interfaces/userinfo';

interface EducationSectionProps {
    education?: IEducation[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
    return (
        <Card className="p-3 mb-3 border-0 shadow-sm" style={{ maxWidth: '95%', margin: '0 auto' }}>
            <h5>Education</h5>
            <div className="border rounded p-3 bg-light">
            {education && education.length > 0 ? (
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                {education.map((edu, index) => (
                    <React.Fragment key={index}>
                    <li style={{ marginBottom: '1rem' }}>
                        <h6>{edu.education_level} in {edu.study_field}</h6>
                        <p>
                        {edu.school_name}, {
                            new Date(edu.begin).toLocaleString('default', { 
                            month: 'long', 
                            year: 'numeric' 
                            })} - {
                            edu.end 
                                ? new Date(edu.end).toLocaleString('default', { 
                                month: 'long', 
                                year: 'numeric' 
                                }) 
                                : "Present"
                            }
                        </p>
                    </li>
                    {index < education.length - 1 && <hr />}
                    </React.Fragment>
                ))}
                </ul>
            ) : (
                <p>No education information provided</p>
            )}
            </div>
        </Card>
    );
};

export default EducationSection;