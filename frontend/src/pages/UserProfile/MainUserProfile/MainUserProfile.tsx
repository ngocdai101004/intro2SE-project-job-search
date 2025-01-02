import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosInstance from "../../../common/axiosInstance";
import IUserInfo, {
    ICertification,
    IEducation,
    IExperience,
    IJobPreference,
    IPublication,
    IQualification
} from "../../../interfaces/userinfo.ts";
import UserEducation from "../InfoCards/UserEducation.tsx";
import UserExp from "../InfoCards/UserExp.tsx";
import UserPrefs from "../InfoCards/UserPrefs.tsx";
import UserCertification from "../InfoCards/UserCerts.tsx";
import UserQualification from "../InfoCards/UserQuals.tsx";
import UserPublication from "../InfoCards/UserPubs.tsx";
import UserCommonInfo from "../InfoCards/UserCommonInfo.tsx";
import UserSummary from "../InfoCards/UserSummary.tsx";


const UserMainProfile = ({userID}: { userID: string | null }) => {
    const [userInfo, setUserInfo] = useState<IUserInfo | undefined>();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                let response;
                if (!userID) {
                    response = await axiosInstance.get("/user/profile/info");
                } else {
                    response = await axiosInstance.get("/user/" + userID + "/profile/info");
                }
                setUserInfo(response.data.data.userInfo);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchUserInfo();
        console.log("effected");
    }, []);

    if (!userInfo) {
        return (
            <h1>Loading...</h1>
        );
    }

    const patchUserInfo = async (newUserInfo: IUserInfo) => {
        try {
            await axiosInstance.patch("/user/profile/info", newUserInfo);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }

    const handleEducationChange = (updatedEducation: IEducation[]) => {
        const newUserInfo = {...userInfo, education: updatedEducation};
        setUserInfo({...userInfo, education: updatedEducation});
        patchUserInfo(newUserInfo);
    };

    const handleExperienceChange = (updatedExperience: IExperience[]) => {
        const newUserInfo = {...userInfo, experience: updatedExperience};
        setUserInfo({...userInfo, experience: updatedExperience});
        patchUserInfo(newUserInfo);
    }

    const handleJobPreferenceChange = (updatedJobPreference: IJobPreference[]) => {
        const newUserInfo = {...userInfo, job_preferences: updatedJobPreference};
        setUserInfo({...userInfo, job_preferences: updatedJobPreference});
        patchUserInfo(newUserInfo);
    }

    const handleCertificationChange = (updatedCertification: ICertification[]) => {
        const newUserInfo = {...userInfo, certifications: updatedCertification};
        setUserInfo({...userInfo, certifications: updatedCertification});
        patchUserInfo(newUserInfo);
    }

    const handleQualificationChange = (updatedQualification: IQualification[]) => {
        const newUserInfo = {...userInfo, qualifications: updatedQualification};
        setUserInfo({...userInfo, qualifications: updatedQualification});
        patchUserInfo(newUserInfo);
    }

    const handlePublicationChange = (updatedPublication: IPublication[]) => {
        const newUserInfo = {...userInfo, publications: updatedPublication};
        setUserInfo({...userInfo, publications: updatedPublication});
        patchUserInfo(newUserInfo);
    }

    return (
        <Container className="h-100 w-75 overflow-auto">
            <Row className="mb-4">
                <Col>
                    <UserSummary summary={userInfo.summary ? userInfo.summary : "Nothing to show"}
                                 onSummaryChange={(updated) => {
                                     const newUserInfo = {...userInfo, summary: updated};
                                     setUserInfo({...userInfo, summary: updated});
                                     patchUserInfo(newUserInfo);
                                 }}/>

                    <UserCommonInfo commonInfoLabel="Awards" userCommonInfoList={userInfo.awards}
                                    onCommonInfoChange={(updated) => {
                                        const newUserInfo = {...userInfo, awards: updated};
                                        setUserInfo({...userInfo, awards: updated});
                                        patchUserInfo(newUserInfo);
                                    }}/>
                    <hr/>
                    <UserCommonInfo commonInfoLabel="Languages" userCommonInfoList={userInfo.languages}
                                    onCommonInfoChange={(updated) => {
                                        const newUserInfo = {...userInfo, languages: updated};
                                        setUserInfo({...userInfo, languages: updated});
                                        patchUserInfo(newUserInfo);
                                    }}/>
                    <hr/>
                    <UserCommonInfo commonInfoLabel="Links" userCommonInfoList={userInfo.link}
                                    onCommonInfoChange={(updated) => {
                                        const newUserInfo = {...userInfo, link: updated};
                                        setUserInfo({...userInfo, link: updated});
                                        patchUserInfo(newUserInfo);
                                    }}/>
                    <hr/>
                    <UserCommonInfo commonInfoLabel="Skills" userCommonInfoList={userInfo.skills}
                                    onCommonInfoChange={(updatedSkills) => {
                                        const newUserInfo = {...userInfo, skills: updatedSkills};
                                        setUserInfo({...userInfo, skills: updatedSkills});
                                        patchUserInfo(newUserInfo);
                                    }}/>
                    <hr/>
                    <UserEducation userEducationList={userInfo.education}
                                   onEducationChange={handleEducationChange}/>
                    <hr/>
                    <UserExp userExperienceList={userInfo.experience}
                             onExperienceChange={handleExperienceChange}/>
                    <hr/>
                    <UserPrefs userJobPreferenceList={userInfo.job_preferences}
                               onJobPreferenceChange={handleJobPreferenceChange}/>
                    <hr/>
                    <UserCertification userCertificationList={userInfo.certifications}
                                       onCertificationChange={handleCertificationChange}/>
                    <hr/>
                    <UserQualification userQualificationList={userInfo.qualifications}
                                       onQualificationChange={handleQualificationChange}/>
                    <hr/>
                    <UserPublication userPublicationList={userInfo.publications}
                                     onPublicationChange={handlePublicationChange}/>
                    <hr/>
                </Col>
            </Row>
        </Container>
    );
};

export default UserMainProfile;
