import React from 'react';
import { Card } from 'react-bootstrap';

interface SkillsSectionProps {
    skills?: string[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
    return (
        <Card className="p-3 mb-3 border-0 shadow-sm" style={{ maxWidth: '95%', margin: '0 auto' }}>
            <h5>Skills</h5>
            <div className="border rounded p-3 bg-light">
            <ul>
                {skills && skills.length > 0 ? (
                skills.map((skill, index) => (
                    <li key={index} style={{ marginBottom: '0.3rem' }}>
                    {skill}
                    </li>
                ))
                ) : (
                <p>No skills provided</p>
                )}
            </ul>
            </div>
        </Card>
    );
};

export default SkillsSection;