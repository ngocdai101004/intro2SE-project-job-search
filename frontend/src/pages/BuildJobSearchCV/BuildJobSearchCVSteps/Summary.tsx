// ResumeSteps/Summary.tsx
import React from 'react';
import { Form } from 'react-bootstrap';


interface SummaryProps {
    summary: string;
    setSummary: (summary: string) => void;
}

const Summary: React.FC<SummaryProps> = ({ summary, setSummary }) => {
    return (
        <div className="bg-light p-4">
            <h4>Professional Summary</h4>
            <Form.Group className="mb-3">
                <Form.Label>Tell us about yourself</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    value={summary} 
                    onChange={(e) => setSummary(e.target.value )}
                    placeholder="Write a professional summary highlighting your key strengths and career objectives..."
                />
            </Form.Group>
        </div>
    );
};

export default Summary;