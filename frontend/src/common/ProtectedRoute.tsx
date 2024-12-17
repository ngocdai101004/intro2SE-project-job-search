import { useEffect, useState } from 'react';
import { isAuthenticated } from '../common/isAuthenticated';
import {useNavigate} from "react-router-dom";
import * as React from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isAuthenticated();
            setAuth(authStatus);
        };
        checkAuth();
    }, []);

    if (auth === null) {
        // Show a loading spinner while checking authentication
        return <div>Loading...</div>;
    }

    if (!auth) {
        navigate("/signin");
    }

    // Render the protected content if authenticated
    return <>{children}</>;
};

export default ProtectedRoute;
