import React from 'react';
import { Card } from 'react-bootstrap';
import { IJobPreference } from '../../../interfaces/userinfo';

interface JobPreferencesSectionProps {
    jobPreferences?: IJobPreference[];
}

const JobPreferencesSection: React.FC<JobPreferencesSectionProps> = ({ jobPreferences }) => {
    return (
        <Card className="p-3 mb-3 border-0 shadow-sm" style={{ maxWidth: '95%', margin: '0 auto' }}>
            <h5>Job Preferences</h5>
            <div className="border rounded p-3 bg-light">
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {jobPreferences && jobPreferences.map((job, index) => (
            <React.Fragment key={index}>
                <li style={{ marginBottom: '1rem' }}>
                <strong>Job Title:</strong> {job.job_title}<br />
                <strong>Industry:</strong> {job.industry}<br />
                <strong>Relocate Preference:</strong> {job.relocate_preference}<br />
                {job.salary_expectation && (
                <>
                <strong>Salary Expectation:</strong> ${job.salary_expectation}
                </>
                )}
                </li>
                {index < jobPreferences.length - 1 && <hr />}
            </React.Fragment>
            ))}
            </ul>
            </div>
        </Card>
    );
};

export default JobPreferencesSection;