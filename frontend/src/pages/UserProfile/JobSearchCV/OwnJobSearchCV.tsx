import JobSearchCV from "./JobSearchCV.tsx";
import axiosInstance from "../../../common/axiosInstance";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const OwnJobSearchCV = () => {
    const [userID, setUserID] = React.useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            if (response.status === 200) {
                setIsAuthenticated(true);
                setUserID(response.data.data.userID);
            }
            else {
                console.log("User not authenticated");
                navigate("/signin");
                
            }
        } catch (error: unknown) {
            console.error("Error fetching user data:", error);
        }
        };
        fetchUserData();
        
    }, [isAuthenticated, navigate]);

    
    return (
        <JobSearchCV userID={userID} isOwer={true}/>
    );
};

export default OwnJobSearchCV;