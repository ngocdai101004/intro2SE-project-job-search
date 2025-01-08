import React from 'react';
import { Card } from 'react-bootstrap';

interface ResumeSectionProps {
    userID?: string | null;
    resumes?: string[];
}

const ResumeSection: React.FC<ResumeSectionProps> = ({userID, resumes}) => {
    const jobSearchCVUrl = userID ? `/user/${userID}/profile/job-search-cv` : `/user/profile/job-search-cv`;

    return (
        <Card className="p-3 mb-3 border-0 shadow-sm" style={{ maxWidth: '95%', margin: '0 auto' }}>
            <h5>Resume</h5>
            <div className="border rounded p-3 bg-light">
            <div className="d-flex flex-row flex-wrap">
                <div className="p-2">
                <a href={jobSearchCVUrl} rel="noopener noreferrer">
                    <i className="bi bi-file-earmark-text"></i> Jobsearch Resume
                </a>
                </div>
                {resumes && resumes.map((resumeUrl, index) => (
                <div className="p-2" key={index}>
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-file-earmark-text"></i> Resume {index + 1}
                    </a>
                </div>
                ))}
            </div>
            </div>
        </Card>
    );
};

export default ResumeSection;