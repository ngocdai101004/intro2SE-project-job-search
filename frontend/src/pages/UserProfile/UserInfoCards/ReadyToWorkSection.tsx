import React from 'react';
import { Card } from 'react-bootstrap';

interface ReadyToWorkSectionProps {
    readyToWork: boolean;
    isOwnProfile?: boolean;
    onReadyToWorkChange: () => void;
}

const ReadyToWorkSection: React.FC<ReadyToWorkSectionProps> = ({ 
    readyToWork, 
    isOwnProfile, 
    onReadyToWorkChange 
}) => {
    return (
        <Card className="p-3 mb-3 border-0 shadow-sm" style={{ maxWidth: '95%', margin: '0 auto' }}>
            <h5>Ready to Work</h5>
            <div className="border rounded p-3 bg-light">
                <div className="d-flex align-items-center">
                    <p className="mb-0">I'm available to start immediately</p>
                    <div className="form-check form-switch ms-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="readyToWorkSwitch"
                            checked={readyToWork}
                            onChange={onReadyToWorkChange}
                            disabled={!isOwnProfile}
                        />
                        <label className="form-check-label" htmlFor="readyToWorkSwitch"></label>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ReadyToWorkSection;