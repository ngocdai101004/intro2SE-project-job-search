import { createBrowserRouter } from 'react-router-dom';
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import ProtectedRoute from "./common/ProtectedRoute.tsx";
import Home from "./pages/Home.tsx";
import Verify from "./pages/Verify.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import VerifyCodePassword from "./pages/ForgotPasswordEmail.tsx";
import ForgotPasswordEmail from "./pages/ForgotPasswordEmail.tsx";



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
        },
        {
            path: '/verify',
            element: <Verify/>
        },
        {
            path: '/forgotpassword/:email',
            element: <ForgotPasswordEmail/>,
        },
        {
            path: '/forgotpassword',
            element: <ForgotPassword/>
        },

        {
            element: <ProtectedRoute/>,
            children: [
                {
                    path: '/home',
                    element: <Home/>,
                },
                {
                    path: '*',
                    element: <Home/>
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