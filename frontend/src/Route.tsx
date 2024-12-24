import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn.tsx";
import SignUp from "./pages/Auth/SignUp.tsx";
import ProtectedRoute from "./common/ProtectedRoute.tsx";
import Verify from "./pages/Auth/Verify.tsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.tsx";
import ForgotPasswordEmail from "./pages/Auth/ForgotPasswordEmail.tsx";
import Company from "./pages/Company/Company.tsx";
import Home from "./pages/Home/Home.tsx";
import CreateJobPost from "./pages/MyCompany/CreateJobPost/CreateJobPost.tsx";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
    index: true,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/forgotpassword/:email",
    element: <ForgotPasswordEmail />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },

  {
    path: "/company",
    element: <Company />,
  },
  {
    path: "/my-company/create-job-post",
    element: <CreateJobPost />,
  },
  // {
  //   path: "/home",
  //   element: <Home />,
  // },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;
