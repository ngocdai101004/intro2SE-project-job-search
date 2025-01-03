import React from 'react';
import { Button } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { JobDetailProps } from '../../../interfaces/job';

const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
    return (
        <div className="card mb-2 shadow-sm">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h3 className="card-title font-weight-bold">{job.title}</h3>
                        <div className="d-flex align-items-center mb-2">
                            <img
                                src={job.company_avatar}
                                alt={job.company_name}
                                className="rounded-circle"
                                style={{ width: '20px', height: '20px', marginRight: '10px' }}
                            />
                            <span>{job.company_name}</span>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-start">
                        <p className="card-text" style={{ fontWeight: 'bold', marginRight: '20px', fontSize: '14px' }}>
                            {job.type}
                        </p>
                        <p className="card-text" style={{ fontWeight: 'bold', marginRight: '20px', fontSize: '14px' }}>
                            {job.location_type}
                        </p>
                        <p className="card-text" style={{ fontWeight: 'bold', marginRight: '20px', fontSize: '14px' }}>
                            {job.number_of_peoples} available positions
                        </p>
                        {job.salary && (
                            <p className="card-text" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                                {job.salary.min === job.salary.max
                                    ? `Salary: $${job.salary.min}`
                                    : `Salary: $${job.salary.min} - $${job.salary.max}`}
                            </p>
                        )}
                    </div>
                    <Button variant="primary" style={{ fontSize: "0.9rem", marginTop: '-20px', marginRight: '10px' }}>
                        Apply Now
                    </Button>
                </div>
                <hr style={{ width: '100%', margin: '0' }} />
                <div className="card-text" style={{ marginTop: '30px' }}>
                    <h5>Description</h5>
                    <ReactMarkdown className="card-text">
                        {job.description}
                    </ReactMarkdown>
                </div>
                {job.requirements && (
                    <div className="card-text" style={{ marginTop: '20px' }}>
                        <h5>Requirements</h5>
                        <ul>
                            {job.requirements.map((requirement, index) => (
                                <li key={index}>{requirement}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {job.benefits && (
                    <div className="card-text" style={{ marginTop: '20px' }}>
                        <h5>Benefits</h5>
                        <ul>
                            {job.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {job.responsibilities && (
                    <div className="card-text" style={{ marginTop: '20px' }}>
                        <h5>Responsibilities</h5>
                        <ul>
                            {job.responsibilities.map((responsibility, index) => (
                                <li key={index}>{responsibility}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobDetail;