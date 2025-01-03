// ResumeSteps/ReviewStep.tsx
import React from 'react';
import { Card,  Badge } from 'react-bootstrap';
import { ResumeData } from '../../../interfaces/userinfo';
import { IEducation } from '../../../interfaces/userinfo';
import { IQualification } from '../../../interfaces/userinfo';
import { IExperience } from '../../../interfaces/userinfo';
import { ICertification } from '../../../interfaces/userinfo';
import { IJobPreference } from '../../../interfaces/userinfo';





interface ReviewProps {
    data: ResumeData;
}

const ReviewStep: React.FC<ReviewProps> = ({ data }) => {
    const formatDate = (date: Date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="review-stepc bg-light p-4">
            <h4 className="mb-4">Review Your Resume</h4>

            {/* Summary Section */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Professional Summary</Card.Title>
                    <Card.Text>{data.summary}</Card.Text>
                </Card.Body>
            </Card>

            {/* Education Section */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Education</Card.Title>
                    {data.education.map((edu: IEducation, index: number) => (
                        <div key={index} className="mb-3">
                            <h6>{edu.education_level} in {edu.study_field}</h6>
                            <p className="mb-1">{edu.school_name}</p>
                            <p className="text-muted">
                                {formatDate(edu.begin)} - {edu.end ? formatDate(edu.end) : 'Present'}
                            </p>
                            {edu.additional_details && (
                                <p className="small">{edu.additional_details}</p>
                            )}
                        </div>
                    ))}
                </Card.Body>
            </Card>

            {/* Qualifications Section */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Qualifications</Card.Title>
                    {data.qualifications.map((qual: IQualification, index: number) => (
                        <div key={index} className="mb-3">
                            <h6>{qual.title}</h6>
                            {qual.description && <p className="small">{qual.description}</p>}
                        </div>
                    ))}
                </Card.Body>
            </Card>

            {/* Skills Section */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Skills</Card.Title>
                    <ul className="list-unstyled">
                        {data.skills.map((skill: string, index: number) => (
                            <li key={index} className="d-flex align-items-center mb-2 border p-2 rounded bg-white">
                                <span className="me-2">{skill}</span>
                            </li>
                        ))}
                    </ul>
                </Card.Body>
            </Card>

            {/* Experience Section */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Work Experience</Card.Title>
                    {data.experience.map((exp: IExperience, index: number) => (
                        <div key={index} className="mb-3">
                            <h6>{exp.job_title}</h6>
                            <p className="mb-1">{exp.company_name}</p>
                            <p className="text-muted">
                                {formatDate(exp.begin)} - {exp.end ? formatDate(exp.end) : 'Present'}
                            </p>
                            {exp.description && <p className="small">{exp.description}</p>}
                        </div>
                    ))}
                </Card.Body>
            </Card>

            {/* Certifications Section */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Certifications</Card.Title>
                    {data.certifications.map((cert: ICertification, index: number) => (
                        <div key={index} className="mb-3">
                            <h6>{cert.name}</h6>
                            <p className="mb-1">{cert.issuing_organization}</p>
                            <p className="text-muted">Issued: {formatDate(cert.issue_date)}</p>
                        </div>
                    ))}
                </Card.Body>
            </Card>

            {/* Job Preferences Section */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Job Preferences</Card.Title>
                    <div className="mb-3">
                        <Badge bg={data.ready_to_work ? "success" : "warning"}>
                            {data.ready_to_work ? "Ready to Work" : "Not Ready to Work"}
                        </Badge>
                    </div>
                    {data.job_preferences.map((pref: IJobPreference, index: number) => (
                        <div key={index} className="mb-3">
                            <h6>{pref.job_title}</h6>
                            <p className="mb-1">Industry: {pref.industry}</p>
                            <p className="mb-1">Relocation: {pref.relocate_preference}</p>
                            {pref.salary_expectation && (
                                <p className="mb-1">
                                    Expected Salary: ${pref.salary_expectation.toLocaleString()}/year
                                </p>
                            )}
                        </div>
                    ))}
                </Card.Body>
            </Card>
        </div>
    );
};

export default ReviewStep;