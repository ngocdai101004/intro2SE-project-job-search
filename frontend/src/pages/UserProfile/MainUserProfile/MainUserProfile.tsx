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
    setUser?: React.Dispatch<React.SetStateAction<IUser>>;
    setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>;
    isOwnProfile?: boolean;
}

interface ICompanyReviewer {
    name: string;
    avatar: string;
    content: string;
    rating: number;
};

const UserMainProfile = ({ userData, setUserInfo, isOwnProfile }: UserMainProfileProps) => {
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
                    <Card className="p-3 mb-3 border-0">
                        <h5>Resume</h5>
                        <div className="border rounded p-3">
                            <div className="d-flex">
                                <div className="p-2">
                                    <a href={`/user/${userData.user._id}/profile/job-search-cv`} target="_blank" rel="noopener noreferrer">
                                        <i className="bi bi-file-earmark-text"></i> Jobsearch Resume
                                    </a>
                                </div>
                                {userData.userInfo.resume && userData.userInfo.resume.map((resumeUrl, index) => (
                                    <div className="p-2" key={index}>
                                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                            <i className="bi bi-file-earmark-text"></i> Resume {index + 1}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                    <hr />
                    <Card className="p-3 mb-3 border-0">
                        <h5>Qualifications</h5>
                        <div className="border rounded p-3">
                            <Row>
                                {userData.userInfo.qualifications && userData.userInfo.qualifications.map((qualification: { title: string, description?: string }, index: number) => (
                                    <Col md={6} key={index}>
                                        <p><strong>{qualification.title}</strong>: {qualification.description || "No description provided"}</p>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Card>
                    <hr />
                    <Card className="p-3 mb-3 border-0">
                        <h5>Job Preferences</h5>
                        <div className="border rounded p-3">
                            <ul>
                                {userData.userInfo.job_preferences && userData.userInfo.job_preferences.map((job: { job_title: string }, index: number) => (
                                    <li key={index}>{job.job_title}</li>
                                ))}
                            </ul>
                        </div>
                    </Card>
                    <hr />
                    <Card className="p-3 mb-3 border-0">
                        <h5>Ready to Work</h5>
                        <div className="border rounded p-3">
                            <div className="d-flex align-items-center">
                                <p className="mb-0">I'm available to start immediately</p>
                                <div className="form-check form-switch ms-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="readyToWorkSwitch"
                                        checked={readyToWork}
                                        onChange={handleReadyToWorkChange}
                                        disabled={!isOwnProfile}
                                    />
                                    <label className="form-check-label" htmlFor="readyToWorkSwitch"></label>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <hr />
                    <Card className="p-3 mb-3 border-0">
                        <h5>Reviews</h5>
                        <div className="border rounded p-3">
                            {reviewerList.length > 0 ? (
                                reviewerList.map((reviewer, index) => (
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
                </Col>
            </Row>
        </div>
    );
};

export default UserMainProfile;
