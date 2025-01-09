// UserRegistrationForm.tsx
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import PersonalInfo from "./InfoCards/CompanyInfo.tsx";
import DescriptionInfo from "./InfoCards/DescriptionInfo.tsx";
import AddressInfo from "./InfoCards/AddressInfo.tsx";
import AvatarUpload from "./InfoCards/AvatarUpload.tsx";
import axios from "axios";
import axiosInstance from "../../common/axiosInstance.tsx";
import { toast } from "react-toastify";
import { MyToastContainer } from "../../components/MyToastContainer.tsx";
import { useNavigate } from "react-router-dom";
import ICompany from "../../interfaces/company.ts";
import AdminInfo from "./InfoCards/AdminInfo.tsx";
import IUser from "../../interfaces/user.ts";

type FormStep = "information" | "description" | "address" | "avatar" | "admin";

interface Props {
  companyData: ICompany;
  setCompanyData: React.Dispatch<React.SetStateAction<ICompany>>;
  isCreating: boolean;
  _id: string | undefined;
}

const UserRegistrationForm: React.FC<Props> = ({
  companyData,
  setCompanyData,
  isCreating,
  _id,
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FormStep>("information");

  const [adminInfos, setAdminInfos] = useState<IUser[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Formatdata", companyData);
    e.preventDefault();
    const toastId = toast.loading("Updating...");
    console.log(isCreating);
    console.log(companyData._id);

    try {
      if (isCreating || _id === undefined) {
        const response = await axiosInstance.post(
          "/company/build-company",
          companyData
        );
        console.log(response.data);
        toast.update(toastId, {
          render: "Company created successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          onClose: () =>
            navigate(`/my-company/${response.data.data.company._id}/job-list`),
        });
        return;
      } else {
        handleChange("_id", _id);
        const response = await axiosInstance.put(`/${_id}`, companyData);
        console.log(response.data);
        toast.update(toastId, {
          render: "Company updated successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.update(toastId, {
          render: error.response.data?.message || "An error occurred.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: "Update failed. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        console.log("Update failed:", error);
      }
    }
  };

  const handleChange = (field: keyof ICompany, value: unknown) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    switch (currentStep) {
      case "information":
        setCurrentStep("description");
        break;
      case "description":
        setCurrentStep("address");
        break;
      case "address":
        setCurrentStep("avatar");
        break;
      case "avatar":
        setCurrentStep("admin");
        break;
    }
  };

  const previousStep = () => {
    switch (currentStep) {
      case "description":
        setCurrentStep("information");
        break;
      case "address":
        setCurrentStep("description");
        break;
      case "avatar":
        setCurrentStep("address");
        break;
      case "admin":
        setCurrentStep("avatar");
        break;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "information":
        return <PersonalInfo data={companyData} onChange={handleChange} />;
      case "description":
        return <DescriptionInfo data={companyData} onChange={handleChange} />;
      case "address":
        return <AddressInfo data={companyData} onChange={handleChange} />;
      case "avatar":
        return <AvatarUpload data={companyData} onChange={handleChange} />;
      case "admin":
        return (
          <AdminInfo
            data={companyData}
            onChange={handleChange}
            adminInfos={adminInfos}
            setAdminInfos={setAdminInfos}
          />
        );
    }
  };

  const renderProgressBar = () => {
    const steps = ["personal", "description", "address", "avatar", "admin"];
    const currentIndex = steps.indexOf(currentStep);
    const progress = ((currentIndex + 1) / steps.length) * 100;

    return (
      <div className="mb-4">
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span className={currentStep === "information" ? "fw-bold" : ""}>
            Information
          </span>
          <span className={currentStep === "description" ? "fw-bold" : ""}>
            Description
          </span>
          <span className={currentStep === "address" ? "fw-bold" : ""}>
            Address
          </span>
          <span className={currentStep === "avatar" ? "fw-bold" : ""}>
            Avatar
          </span>
          <span className={currentStep === "admin" ? "fw-bold" : ""}>
            Admin
          </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex flex-column min-vh-100">
        <Container className="center mt-5" style={{ width: "60%" }}>
          <h2 className="text-center mb-4">Build Your Company</h2>
          {renderProgressBar()}
          <Form>
            <div
              className="min-vh-60 mt-5"
              style={{
                height: "35vh",
                overflowY: "auto",
                overflowX: "hidden",
                padding: "0 20px",
              }}
            >
              {renderStepContent()}
            </div>

            <div className="d-flex justify-content-between mt-4 fixed-bottom-buttons">
              {currentStep !== "information" ? (
                <Button variant="secondary" onClick={previousStep}>
                  Previous
                </Button>
              ) : (
                <div></div>
              )}
              {currentStep !== "admin" ? (
                <Button variant="primary" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button variant="success" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </div>
          </Form>
          <MyToastContainer />
        </Container>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
