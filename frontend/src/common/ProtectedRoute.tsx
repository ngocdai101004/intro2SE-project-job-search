import React, {useEffect, useState} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axiosInstance from "./axiosInstance.tsx";
import {CircleLoader} from "react-spinners";

const ProtectedRoute: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isVerified, setIsVerified] = useState<boolean>(true);
    const [loading, setLoading] = useState(true);



    const verifyUser = async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            if(response.data.message === "User is not verified"){
                setIsVerified(false);
            }
            setIsAuthenticated(true);
        } catch (error) {
            console.log('User not authenticated:', error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyUser();
    }, []);

    if (loading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <CircleLoader
                    color="#00f7ff"
                    size={100}
                />
                <h1 className="text-center mt-4">Factos: Tuan dep trai</h1>
            </div>
        )
    }

    if (!isVerified) {
        return <Navigate to="/verify" replace/>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace/>;
    }

    return <Outlet/>;
};


export default ProtectedRoute;
