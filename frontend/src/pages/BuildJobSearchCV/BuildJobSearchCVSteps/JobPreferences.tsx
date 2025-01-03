import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { BuildJobSearhCVProps } from '../../../interfaces/userinfo';
import { IJobPreference} from '../../../interfaces/userinfo';


const JobPreferences: React.FC<BuildJobSearhCVProps> = ({ data, setData }) => {
    const addJobPreference = () => {
        setData({
            ...data,
            job_preferences: [...data.job_preferences, {
                job_title: '',
                industry: '',
                relocate_preference: 'flexible',
                salary_expectation: undefined
            }]
        });
    };

    const removeJobPreference = (index: number) => {
        const newPreferences = data.job_preferences.filter((_: IJobPreference, i: number) => i !== index);
        setData({ ...data, job_preferences: newPreferences });
    };

    const updateJobPreference = (index: number, field: string, value: string | number | undefined) => {
        const newPreferences = [...data.job_preferences];
        newPreferences[index] = { ...newPreferences[index], [field]: value };
        setData({ ...data, job_preferences: newPreferences });
    };

    return (
        <div className="bg-light p-4">
            <h4 className="mb-4">Job Preferences</h4>
            <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="I am ready to work"
                    checked={data.ready_to_work}
                    onChange={(e) => setData({ ...data, ready_to_work: e.target.checked })}
                />
            </Form.Group>

            {data.job_preferences.map((pref: IJobPreference, index: number) => (
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