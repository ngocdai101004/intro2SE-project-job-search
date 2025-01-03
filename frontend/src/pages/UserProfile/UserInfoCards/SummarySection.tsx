import React from 'react';
import { Card } from 'react-bootstrap';

interface SummarySectionProps {
    summary?: string;
}

const SummarySection: React.FC<SummarySectionProps> = ({ summary }) => {
    return (
        <Card className="p-3 mb-3 border-0 shadow-sm" style={{ maxWidth: '95%', margin: '0 auto' }}>
            <h5>Summary</h5>
            <div className="border rounded p-3 bg-light">
            <p>{summary || "No summary provided"}</p>
            </div>
        </Card>
    );
};

export default SummarySection;