import JobSearchCV from "./JobSearchCV.tsx";
import axiosInstance from "../../../common/axiosInstance";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const OwnJobSearchCV = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            if (response.status === 200) {
                setIsAuthenticated(true);
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
        <JobSearchCV userID={null} isOwer={true}/>
    );
};

export default OwnJobSearchCV;