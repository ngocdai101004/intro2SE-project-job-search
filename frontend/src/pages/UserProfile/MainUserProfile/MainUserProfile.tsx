import React, { useEffect, useState, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import axiosInstance from '../../../common/axiosInstance';
import { ICompanyReviewer, UserProfileProps } from '../../../interfaces/userinfo';

import ResumeSection from '../UserInfoCards/ResumeSection';
import QualificationsSection from '../UserInfoCards/QualificationsSection';
import JobPreferencesSection from '../UserInfoCards/JobPreferencesSection';
import ReadyToWorkSection from '../UserInfoCards/ReadyToWorkSection';
import ReviewsSection from '../UserInfoCards/ReviewsSection';
import IUserInfo, {
    // IJobPreference,
    // IQualification
} from "../../../interfaces/userinfo.ts";
import { EditingContext } from './UserProfile.tsx';


const MainUserProfile: React.FC<UserProfileProps> = ({ 
        userID
}) => {
    const [userInfo, setUserInfo] = useState<IUserInfo>({user_id: "", ready_to_work: false});
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (!userID) {
            const response = await axiosInstance.get("/user/profile/info");
            setUserInfo(response.data.data.userInfo);
  
          }
          else if (userID) {
            const response = await axiosInstance.get("/user/" + userID + "/profile/info");
            setUserInfo(response.data.data.userInfo);
          }
          else {
            return;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }, [userID, useContext(EditingContext)]);



    const [reviewerList, setReviewerList] = useState<ICompanyReviewer[]>([]);
    let readyToWork = userInfo.ready_to_work ?? false;

    useEffect(() => {
        const fetchData = async () => {
            const tempReviewerList: ICompanyReviewer[] = [];
            if (userInfo.review) {
                for (let i = 0; i < userInfo.review.length; i++) {
                    try {
                        const response = await axiosInstance.get("/company/" + userInfo.review[i].reviewer);
                        tempReviewerList.push({
                            name: response.data.data.company.company_name || "Anonymous",
                            avatar: response.data.data.company.avatar || "company-avatar.jpg",
                            content: userInfo.review[i].content,
                            rating: userInfo.review[i].rating
                        });
                    } catch (error) {
                        console.error("Error fetching reviewer data:", error);
                    }
                }
                setReviewerList(tempReviewerList);
            }
        };
        fetchData();
    }, [userInfo.review]);

    const patchUserInfo = async (newUserInfo: IUserInfo) => {
        try {
            await axiosInstance.put(`/user/profile/info`, newUserInfo);
        } catch (error) {
            console.error("Error updating user info:", error);
        }
    }


    // const handleQualificationChange = async (newQualifications: IQualification[]) => {
    //     const newUserInfo = { ...userInfo, qualifications: newQualifications };
    //     setUserInfo((prev) => ({ ...prev, qualifications: newQualifications }));
    //     patchUserInfo(newUserInfo);
    // };

    // const handleJobPreferenceChange = async (newJobPreferences: IJobPreference[]) => {
    //     const newUserInfo = { ...userInfo, job_preferences: newJobPreferences };
    //     setUserInfo((prev) => ({ ...prev, job_preferences: newJobPreferences }));
    //     patchUserInfo(newUserInfo);
    // };


    const handleReadyToWorkChange = async () => {
        const newReadyToWork = !readyToWork;
        readyToWork = newReadyToWork;
        const newUserInfo = { ...userInfo, ready_to_work: newReadyToWork };
        setUserInfo((prev) => ({ ...prev, ready_to_work: newReadyToWork }));
        patchUserInfo(newUserInfo);
    };


    return (
        <div
            className="container mt-4"
            style={{ overflow: "scroll", scrollbarWidth: "thin", height: "60vh" , maxWidth: '70%'}}
        >
            <Row className="mb-4">
                <Col>
                    <ResumeSection 
                        userID={userID} 
                        resumes={userInfo.resume}
                    />
                    <hr  style={{ width: '95%' }}/>
                    <QualificationsSection 
                        qualifications={userInfo.qualifications}

                    />
                    <hr  style={{ width: '95%' }}/>
                    <JobPreferencesSection 
                        jobPreferences={userInfo.job_preferences} 
                    />
                    <hr  style={{ width: '95%' }}/>
                    <ReadyToWorkSection 
                        readyToWork={readyToWork}
                        isOwnProfile={!userID}
                        onReadyToWorkChange={handleReadyToWorkChange}
                    />
                    <hr  style={{ width: '95%' }}/>
                    <ReviewsSection 
                        reviewers={reviewerList} 
                    />
                </Col>
            </Row>
        </div>
    );
};

export default MainUserProfile;