import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { JobSearchCVProps } from '../../../interfaces/userinfo'
import SummarySection from '../UserInfoCards/SummarySection'
import PersonalInfoSection from '../UserInfoCards/PersonalInfoSection';
import ExperienceSection from '../UserInfoCards/ExperienceSection';
import EducationSection from '../UserInfoCards/EducationSection';
import SkillsSection from '../UserInfoCards/SkillsSection';
import CertificationsSection from '../UserInfoCards/CertificationsSection';

const JobSearchCVBody: React.FC<JobSearchCVProps> = ({ userData }) => {
    return (
        <div
            className="container mt-4"
            style={{ overflow: "scroll", scrollbarWidth: "thin", height: "60vh" , maxWidth: '70%'}}
        >
            <Row className="mb-4">
                <Col>
                    <SummarySection summary={userData.userInfo.summary} />
                    <hr  style={{ width: '95%' }}/>
                    <PersonalInfoSection user={userData.user} />
                    <hr  style={{ width: '95%' }}/>
                    <ExperienceSection experiences={userData.userInfo.experience} />
                    <hr  style={{ width: '95%' }}/>
                    <EducationSection education={userData.userInfo.education} />
                    <hr  style={{ width: '95%' }}/>
                    <SkillsSection skills={userData.userInfo.skills} />
                    <hr  style={{ width: '95%' }}/>
                    <CertificationsSection certifications={userData.userInfo.certifications} />
                </Col>
            </Row>
        </div>
    );
};

export default JobSearchCVBody;