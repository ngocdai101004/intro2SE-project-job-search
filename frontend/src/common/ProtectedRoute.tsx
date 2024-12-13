import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../common/isAuthenticated';
import * as React from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isAuthenticated();
            setAuth(authStatus);
            console.log(authStatus);
        };
        checkAuth();
    }, []);

    if (auth === null) {
        // Show a loading spinner while checking authentication
        return <div>Loading...</div>;
    }

    if (!auth) {
        // Redirect to login page if not authenticated
        return <Navigate to="signin" replace />;
    }

    // Render the protected content if authenticated
    return <>{children}</>;
};

export default ProtectedRoute;
