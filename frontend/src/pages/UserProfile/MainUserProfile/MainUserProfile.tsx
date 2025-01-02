import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import axiosInstance from '../../../common/axiosInstance';
import { ICompanyReviewer, UserProfileProps } from '../../../interfaces/userinfo';

import ResumeSection from '../UserInfoCards/ResumeSection';
import QualificationsSection from '../UserInfoCards/QualificationsSection';
import JobPreferencesSection from '../UserInfoCards/JobPreferencesSection';
import ReadyToWorkSection from '../UserInfoCards/ReadyToWorkSection';
import ReviewsSection from '../UserInfoCards/ReviewsSection';


const UserMainProfile: React.FC<UserProfileProps> = ({ 
    userData, 
    setUserInfo, 
    isOwnProfile 
}) => {
    const [reviewerList, setReviewerList] = useState<ICompanyReviewer[]>([]);
    let readyToWork = userData.userInfo.ready_to_work ?? false;

    useEffect(() => {
        const fetchData = async () => {
            const tempReviewerList: ICompanyReviewer[] = [];
            if (userData.userInfo.review) {
                for (let i = 0; i < userData.userInfo.review.length; i++) {
                    try {
                        const response = await axiosInstance.get("/company/" + userData.userInfo.review[i].reviewer);
                        tempReviewerList.push({
                            name: response.data.data.company.company_name || "Anonymous",
                            avatar: response.data.data.company.avatar || "company-avatar.jpg",
                            content: userData.userInfo.review[i].content,
                            rating: userData.userInfo.review[i].rating
                        });
                    } catch (error) {
                        console.error("Error fetching reviewer data:", error);
                    }
                }
                setReviewerList(tempReviewerList);
            }
        };
        fetchData();
    }, [userData.userInfo.review]);

    const handleReadyToWorkChange = async () => {
        const newReadyToWork = !readyToWork;
        readyToWork = newReadyToWork;
        setUserInfo((prev) => ({ ...prev, ready_to_work: newReadyToWork }));
        try {
            await axiosInstance.put(`/user/profile/info`, { ready_to_work: newReadyToWork });
        } catch (error) {
            console.error("Error updating ready to work status:", error);
        }
    };

    return (
        <div
            className="container mt-4"
            style={{ overflow: "scroll", scrollbarWidth: "thin", height: "60vh" }}
        >
            <Row className="mb-4">
                <Col>
                    <ResumeSection 
                        userID={userData.user._id} 
                        resumes={userData.userInfo.resume} 
                    />
                    <hr />
                    <QualificationsSection 
                        qualifications={userData.userInfo.qualifications} 
                    />
                    <hr />
                    <JobPreferencesSection 
                        jobPreferences={userData.userInfo.job_preferences} 
                    />
                    <hr />
                    <ReadyToWorkSection 
                        readyToWork={readyToWork}
                        isOwnProfile={isOwnProfile}
                        onReadyToWorkChange={handleReadyToWorkChange}
                    />
                    <hr />
                    <ReviewsSection 
                        reviewers={reviewerList} 
                    />
                </Col>
            </Row>
        </div>
    );
};

export default UserMainProfile;