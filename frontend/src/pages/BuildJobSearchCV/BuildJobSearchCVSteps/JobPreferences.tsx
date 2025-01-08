import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { IJobPreference } from '../../../interfaces/userinfo';

interface JobPreferencesProps {
    job_preferences: IJobPreference[];
    ready_to_work: boolean;
    setJobPreferences: (job_preferences: IJobPreference[]) => void;
    setReadyToWork: (ready_to_work: boolean) => void;
}

const JobPreferences: React.FC<JobPreferencesProps> = ({ job_preferences, ready_to_work, setJobPreferences, setReadyToWork }) => {
    const addJobPreference = () => {
        setJobPreferences([
            ...job_preferences,
            {
                job_title: '',
                industry: '',
                relocate_preference: 'flexible',
                salary_expectation: undefined
            }
        ]);
    };

    const removeJobPreference = (index: number) => {
        const newPreferences = job_preferences.filter((_: IJobPreference, i: number) => i !== index);
        setJobPreferences(newPreferences);
    };

    const updateJobPreference = (index: number, field: string, value: string | number | undefined) => {
        const newPreferences = [...job_preferences];
        newPreferences[index] = { ...newPreferences[index], [field]: value };
        setJobPreferences(newPreferences);
    };

    return (
        <div className="bg-light p-4">
            <h4 className="mb-4">Job Preferences</h4>
            <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="I am ready to work"
                    checked={ready_to_work}
                    onChange={(e) => setReadyToWork(e.target.checked)}
                />
            </Form.Group>

            {job_preferences.map((pref: IJobPreference, index: number) => (
                <div key={index} className="mb-4 p-3 border rounded position-relative">
                    <Button 
                        variant="link" 
                        className="position-absolute top-0 end-0 text-danger"
                        onClick={() => removeJobPreference(index)}
                    >
                        Remove
                    </Button>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Desired Job Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={pref.job_title}
                                    onChange={(e) => updateJobPreference(index, 'job_title', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Industry</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={pref.industry}
                                    onChange={(e) => updateJobPreference(index, 'industry', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Relocation Preference</Form.Label>
                                <Form.Select
                                    value={pref.relocate_preference}
                                    onChange={(e) => updateJobPreference(index, 'relocate_preference', e.target.value)}
                                >
                                    <option value="">Select preference</option>
                                    <option value="willing">Willing to relocate</option>
                                    <option value="not_willing">Not willing to relocate</option>
                                    <option value="remote_only">Remote only</option>
                                    <option value="flexible">Flexible</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Expected Salary (USD/year)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={pref.salary_expectation || ''}
                                    onChange={(e) => updateJobPreference(index, 'salary_expectation', 
                                        e.target.value ? parseInt(e.target.value) : undefined)}
                                    placeholder="e.g., 50000"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            ))}
            <Button variant="outline-primary" onClick={addJobPreference}>
                Add Job Preference
            </Button>
        </div>
    );
};

export default JobPreferences;