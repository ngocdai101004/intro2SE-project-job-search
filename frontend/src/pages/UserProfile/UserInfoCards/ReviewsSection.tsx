import React from 'react';
import { Card } from 'react-bootstrap';
import { ICompanyReviewer } from '../../../interfaces/userinfo';

interface ReviewsSectionProps {
    reviewers: ICompanyReviewer[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviewers }) => {
    return (
        <Card className="p-3 mb-3 border-0">
            <h5>Reviews</h5>
            <div className="border rounded p-3">
                {reviewers.length > 0 ? (
                    reviewers.map((reviewer, index) => (
                        <div key={index} className="d-flex mb-3">
                            <img
                                src={reviewer.avatar || "company-avatar.jpg"}
                                alt={reviewer.name}
                                className="rounded-circle me-3"
                                style={{ width: "30px", height: "30px" }}
                            />
                            <div>
                                <h6>{reviewer.name}</h6>
                                <p>{reviewer.content}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews available</p>
                )}
            </div>
        </Card>
    );
};

export default ReviewsSection;