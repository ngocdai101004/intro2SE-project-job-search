import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { JobSearchCVProps } from '../../../interfaces/userinfo'
import SummarySection from '../UserInfoCards/SummarySection'
import PersonalInfoSection from '../UserInfoCards/PersonalInfoSection';
import ExperienceSection from '../UserInfoCards/ExperienceSection';
import EducationSection from '../UserInfoCards/EducationSection';
import SkillsSection from '../UserInfoCards/SkillsSection';
import CertificationsSection from '../UserInfoCards/CertificationsSection';
import IUserInfo from '../../../interfaces/userinfo';
import { useState, useEffect } from 'react';
import axiosInstance from '../../../common/axiosInstance';

const JobSearchCVBody: React.FC<JobSearchCVProps> = ({ userID }) => {
   
    console.log("User ID in MainUserProfile:", userID);
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
    }, [userID]);

  
    return (
        <div
            className="container mt-4"
            style={{ overflow: "scroll", scrollbarWidth: "thin", height: "60vh" , maxWidth: '70%'}}
        >
            <Row className="mb-4">
                <Col>
                    <SummarySection summary={userInfo.summary} />
                    <hr  style={{ width: '95%' }}/>
                    <PersonalInfoSection userID={userID} />
                    <hr  style={{ width: '95%' }}/>
                    <ExperienceSection experiences={userInfo.experience} />
                    <hr  style={{ width: '95%' }}/>
                    <EducationSection education={userInfo.education} />
                    <hr  style={{ width: '95%' }}/>
                    <SkillsSection skills={userInfo.skills} />
                    <hr  style={{ width: '95%' }}/>
                    <CertificationsSection certifications={userInfo.certifications} />
                </Col>
            </Row>
        </div>
    );
};

export default JobSearchCVBody;