import React from 'react';
import { Card } from 'react-bootstrap';
import { IJobPreference } from '../../../interfaces/userinfo';

interface JobPreferencesSectionProps {
    jobPreferences?: IJobPreference[];
}

const JobPreferencesSection: React.FC<JobPreferencesSectionProps> = ({ jobPreferences }) => {
    return (
        <Card className="p-3 mb-3 border-0">
            <h5>Job Preferences</h5>
            <div className="border rounded p-3">
                <ul>
                    {jobPreferences && jobPreferences.map((job, index) => (
                        <li key={index}>{job.job_title}</li>
                    ))}
                </ul>
            </div>
        </Card>
    );
};

export default JobPreferencesSection;