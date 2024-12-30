import { Card, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axiosInstance from "../../../common/axiosInstance";
import IUser from "../../../interfaces/user";
import IUserInfo from "../../../interfaces/userinfo";

interface UserMainProfileProps {
    userData: {
        user: IUser;
        userInfo: IUserInfo;
    };
    isOwnProfile?: boolean;
}

interface ICompanyReviewer {
    name: string;
    avatar: string;
    content: string;
    rating: number;
  };

const JobSearchCVBody = ({ userData }: UserMainProfileProps) => {

const [reviewerList, setReviewerList] = useState<ICompanyReviewer[]>([]);
useEffect(() => {
    const fetchData = async () => {
        const tempReviewerList: ICompanyReviewer[] = [];
        if (userData.userInfo.review) {
            for (let i = 0; i < userData.userInfo.review.length; i++) {
                try {
                    const response = await axiosInstance.get("/company/" + userData.userInfo.review[i].reviewer);
                    console.log("Reviewer Data:", response.data.data.company);
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

console.log("Reviewer List:", reviewerList);

    return (
        <div
            className="container mt-4"
            style={{ overflow: "scroll", scrollbarWidth: "thin", height: "60vh" }}
        >
            <h1>JOB SEARCH CV</h1>
            <Row className="mb-4">
                <Col>
                    <Card className="p-3 mb-3 border-0">
                        <h5>Summary</h5>
                        <div className="border rounded p-3">
                            <p>{userData.userInfo.summary || "No summary provided"}</p>
                        </div>
                    </Card>
                    <hr />
                    <Card className="p-3 mb-3 border-0">
                        <h5>Personal Information</h5>
                        <div className="border rounded p-3">
                            <p><strong>Name:</strong> {(userData.user.first_name ?? "") + " " + (userData.user.last_name ?? "")}</p>
                            <p><strong>Date of birth:</strong> {userData.user.date_of_birth ? new Date(userData.user.date_of_birth).toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' }) : "No date of birth provided"}</p>
                            <p><strong>Email:</strong> {userData.user.email}</p>
                            <p><strong>Phone:</strong> {userData.user.phone ?? "No phone number provided"}</p>
                            <p><strong>Address:</strong> {(userData.user.address?.city_state ?? "") + ", " + (userData.user.address?.country ?? "No address provided")}</p>
                        </div>
                    </Card>
                    <hr />
                    <Card className="p-3 mb-3 border-0">
                        <h5>Work Experience</h5>
                        <div className="border rounded p-3">
                            {userData.userInfo.experience && userData.userInfo.experience.length > 0 ? (
                                userData.userInfo.experience.map((experience, index) => (
                                    <Card key={index} className="mb-3">
                                        <Card.Body>
                                            <h6>{experience.job_title} at {experience.company_name}</h6>
                                            <p>{new Date(experience.begin).toLocaleString('default', { month: 'long', year: 'numeric' })} - {experience.end ? new Date(experience.end).toLocaleString('default', { month: 'long', year: 'numeric' }) : "Present"}</p>
                                            <p>{experience.description}</p>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p>No work experience provided</p>
                            )}
                        </div>
                    </Card>
                    <hr />
                    <Card className="p-3 mb-3 border-0">
                        <h5>Education</h5>
                        <div className="border rounded p-3">
                            {userData.userInfo.education && userData.userInfo.education.length > 0 ? (
                                userData.userInfo.education.map((education, index) => (
                                    <div key={index}>
                                        <h6>{education.education_level} in {education.study_field}</h6>
                                        <p>{education.school_name}, {new Date(education.begin).toLocaleString('default', { month: 'long', year: 'numeric' })} - {education.end ? new Date(education.end).toLocaleString('default', { month: 'long', year: 'numeric' }) : "Present"}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No education information provided</p>
                            )}
                        </div>
                    </Card>
                    <hr />
                    <Card className="p-3 mb-3 border-0">
                        <h5>Skills</h5>
                        <div className="border rounded p-3">
                            <ul>
                                {userData.userInfo.skills && userData.userInfo.skills.length > 0 ? (
                                    userData.userInfo.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))
                                ) : (
                                    <p>No skills provided</p>
                                )}
                            </ul>
                        </div>
                    </Card>
                    <hr />
                    <Card className="p-3 mb-3 border-0">
                        <h5>Certifications and Licenses</h5>
                        <div className="border rounded p-3">
                            {userData.userInfo.certifications && userData.userInfo.certifications.length > 0 ? (
                                userData.userInfo.certifications.map((certification, index) => (
                                    <div key={index}>
                                        <h6>{certification.name}</h6>
                                        <p>{certification.issuing_organization}, {new Date(certification.issue_date).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No certifications or licenses provided</p>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default JobSearchCVBody;
