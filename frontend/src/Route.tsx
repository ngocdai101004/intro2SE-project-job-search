import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn.tsx";
import SignUp from "./pages/Auth/SignUp.tsx";
import ProtectedRoute from "./common/ProtectedRoute.tsx";
import Verify from "./pages/Auth/Verify.tsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.tsx";
import ForgotPasswordEmail from "./pages/Auth/ForgotPasswordEmail.tsx";
// import Company from "./pages/Company/MainCompanyProfile/Company.tsx";
import Home from "./pages/Home/Home.tsx";
import CreateJobPost from "./pages/MyCompany/CreateJobPost/CreateJobPost.tsx";
import AddJobBasics from "./pages/MyCompany/AddJobBasics/AddJobBasics.tsx";
import AddJobDetails from "./pages/MyCompany/AddJobDetails/AddJobDetails.tsx";
import AddPaysAndBenefits from "./pages/MyCompany/AddPaysAndBenefits/AddPaysAndBenefits.tsx";
import DescribeJob from "./pages/MyCompany/DescribeJob/DescribeJob.tsx";
import PreviewJob from "./pages/MyCompany/PreviewJob/PreviewJob.tsx";
import JobList from "./pages/MyCompany/JobList/JobList.tsx";
import OwnUserProfile from "./pages/UserProfile/MainUserProfile/OwnUserProfile";
import GuestUserProfile from "./pages/UserProfile/MainUserProfile/GuestUserProfile.tsx";
import OwnJobSearchCV from "./pages/UserProfile/JobSearchCV/OwnJobSearchCV.tsx";
import GuestJobSearchCV from "./pages/UserProfile/JobSearchCV/GuestJobSearchCV.tsx";
import CompanyList from "./pages/Company/MainCompanyProfile/CompanyList.tsx";
import Candidates from "./pages/MyCompany/Candidates/Candidates.tsx";
import AddJobDescription from "./pages/MyCompany/AddJobDescription/AddJobDescription.tsx";
import BuildProfile from "./pages/BuildProfile/BuildProfile.tsx";
import ChatPage from "./pages/Chat/Chat.tsx";
import ResumeBuilder from "./pages/BuildJobSearchCV/ResumeBuilder.tsx";
import BuildCompany from "./pages/BuildCompany/BuildCompany.tsx";
import ViewCompanies from "./pages/MyCompany/ViewCompanies/ViewCompanies.tsx";
import MainCompany from "./pages/Company/MainCompanyProfile/MainCompany.tsx";
import UserList from "./pages/UserProfile/UserList/UserList.tsx";

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
    element: <MainCompany />,
  },
  {
    path: "/view-company",
    element: <ViewCompanies />,
  },
  {
    path: "/my-company/:company_id/create-job-post",
    element: <CreateJobPost />,
  },
  {
    path: "/my-company/:company_id/add-job-basics",
    element: <AddJobBasics />,
  },
  {
    path: "/my-company/:company_id/add-job-details",
    element: <AddJobDetails />,
  },
  {
    path: "/my-company/:company_id/add-pays-and-benefits",
    element: <AddPaysAndBenefits />,
  },
  {
    path: "/my-company/:company_id/add-job-description",
    element: <AddJobDescription />,
  },
  {
    path: "/my-company/:company_id/describe-job",
    element: <DescribeJob />,
  },
  {
    path: "/my-company/:company_id/preview-job",
    element: <PreviewJob />,
  },
  {
    path: "/my-company/:company_id/job-list",
    element: <JobList />,
  },
  {
    path: "/my-company/:company_id/candidates",
    element: <Candidates />,
  },
  {
    path: "user/build-profile",
    element: <BuildProfile />,
  },
  {
    path: "/user/build-job-search-cv",
    element: <ResumeBuilder />,
  },
  {
    path: "/user/:userID/profile",
    element: <GuestUserProfile />,
  },
  {
    path: "/user/:userID/profile/snapshot",
    element: <GuestUserProfile />,
  },
  {
    path: "/user/:userID/profile/job-search-cv",
    element: <GuestJobSearchCV />,
  },
  {
    path: "/user/profile/job-search-cv",
    element: <OwnJobSearchCV />,
  },
  {
    path: "/user/profile",
    element: <OwnUserProfile />,
  },
  {
    path: "/user/profile/snapshot",
    element: <OwnUserProfile />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "user-list",
    element: <UserList />,
  },
  {
    path: "/user/:userID/profile",
    element: <GuestUserProfile />,
  },
  {
    path: "/user/:userID/profile/snapshot",
    element: <GuestUserProfile />,
  },
  {
    path: "/user/:userID/profile/job-search-cv",
    element: <GuestJobSearchCV />,
  },
  {
    path: "/user/profile/job-search-cv",
    element: <OwnJobSearchCV />,
  },
  {
    path: "/user/profile",
    element: <OwnUserProfile />,
  },
  {
    path: "/user/profile/snapshot",
    element: <OwnUserProfile />,
  },
  {
    path: "/home",
    element: <Home />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/build-company",
        element: <BuildCompany />,
      },
    ],
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;
