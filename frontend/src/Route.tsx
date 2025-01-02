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
import AddJobBasics from "./pages/MyCompany/AddJobBasics/AddJobBasics.tsx";
import AddJobDetails from "./pages/MyCompany/AddJobDetails/AddJobDetails.tsx";
import AddPaysAndBenefits from "./pages/MyCompany/AddPaysAndBenefits/AddPaysAndBenefits.tsx";
import DescribeJob from "./pages/MyCompany/DescribeJob/DescribeJob.tsx";
import PreviewJob from "./pages/MyCompany/PreviewJob/PreviewJob.tsx";
import JobList from "./pages/MyCompany/JobList/JobList.tsx";
import UserProfile from "./pages/UserProfile/MainUserProfile/UserProfile.tsx";
import JobSearchCV from "./pages/UserProfile/JobSearchCV/JobSearchCV.tsx";
import CompanyList from "./pages/Company/CompanyList.tsx";
import Candidates from "./pages/MyCompany/Candidates/Candidates.tsx";

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
    path: "/company-list",
    element: <CompanyList />,
  },

  {
    path: "/company/:company_id/:active_key",
    element: <Company />,
  },

  {
    path: "/my-company/create-job-post",
    element: <CreateJobPost />,
  },
  {
    path: "/my-company/add-job-basics",
    element: <AddJobBasics />,
  },
  {
    path: "/my-company/add-job-details",
    element: <AddJobDetails />,
  },
  {
    path: "/my-company/add-pays-and-benefits",
    element: <AddPaysAndBenefits />,
  },
  {
    path: "/my-company/describe-job",
    element: <DescribeJob />,
  },
  {
    path: "/my-company/preview-job",
    element: <PreviewJob />,
  },
  {
    path: "/my-company/job-list",
    element: <JobList />,
  },
  {
    path: "/my-company/candidates",
    element: <Candidates />,
  },
  {
    path: "/user/:userID/profile",
    element: <UserProfile />,
  },
  {
    path: "/user/:userID/profile/snapshot",
    element: <UserProfile />,
  },
  {
    path: "/user/:userID/profile/job-search-cv",
    element: <JobSearchCV />,
  },
  {
    path: "/user/profile/job-search-cv",
    element: <JobSearchCV />,
  },
  {
    path: "/user/profile",
    element: <UserProfile />,
  },
  {
    path: "/user/profile/snapshot",
    element: <UserProfile />,
  },
  {
    path: "/home",
    element: <Home />,
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
