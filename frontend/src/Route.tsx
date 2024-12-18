import { createBrowserRouter } from 'react-router-dom';
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import ProtectedRoute from "./common/ProtectedRoute.tsx";
import Home from "./pages/Home.tsx";

// Function to get the access token from cookies
const getAccessToken = () => {
    return true;
}

// Function to check if the user is authenticated
const isAuthenticated = () => {
    return getAccessToken();
}

// Create the router configuration
const router = createBrowserRouter(
    [
        {
            path: '/signin',
            element: <SignIn />,
            index: true
        },
        {
            path: '/signup',
            element: <SignUp/>,
            // index: true
        },
        {
            element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
            children: [
                {
                    path: '/home',
                    element: <Home/>,
                }
            ]
        },
        {
            path: '*',
            element: <p>404 Error - Nothing here...</p>
        }
    ]
);

export default router;