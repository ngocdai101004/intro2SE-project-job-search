// UserRegistrationForm.tsx
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import PersonalInfo from "./InfoCards/PersonalInfo";
import ContactInfo from "./InfoCards/ContactInfo";
import AddressInfo from "./InfoCards/AddressInfo";
import AvatarUpload from "./InfoCards/AvatarUpload";
import { IUser, IAddress } from "../../interfaces/user";
import axios from "axios";
import axiosInstance from "../../common/axiosInstance";
import { toast } from "react-toastify";
import { MyToastContainer } from "../../components/MyToastContainer.tsx";
import MyHeader from "../../components/MyHeader.tsx";
import { useNavigate } from "react-router-dom";

type FormStep = "personal" | "contact" | "address" | "avatar";

const UserRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FormStep>("personal");
  const [formData, setFormData] = useState<IUser>({
    phone: "",
    gender: "male",
    date_of_birth: new Date(),
    avatar: "",
    short_bio: "",
    address: {
      district: "",
      city_state: "",
      zip_code: "",
      country: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Formatdata", formData);
    e.preventDefault();
    const toastId = toast.loading("Updating...");

    try {
      const response = await axiosInstance.patch("/user/profile", formData);
      console.log(response.data);
      toast.update(toastId, {
        render: "Profile updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        onClose: () => navigate("/user/build-job-search-cv"),
      });
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

  const handleChange = (field: keyof IUser, value: string | Date) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (addressData: Partial<IAddress>) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        district: addressData.district ?? prev.address?.district ?? "",
        city_state: addressData.city_state ?? prev.address?.city_state ?? "",
        zip_code: addressData.zip_code ?? prev.address?.zip_code ?? "",
        country: addressData.country ?? prev.address?.country ?? "",
      },
    }));
  };

  const nextStep = () => {
    switch (currentStep) {
      case "personal":
        setCurrentStep("contact");
        break;
      case "contact":
        setCurrentStep("address");
        break;
      case "address":
        setCurrentStep("avatar");
        break;
    }
  };

  const previousStep = () => {
    switch (currentStep) {
      case "contact":
        setCurrentStep("personal");
        break;
      case "address":
        setCurrentStep("contact");
        break;
      case "avatar":
        setCurrentStep("address");
        break;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "personal":
        return (
          <PersonalInfo
            gender={formData.gender}
            dateOfBirth={formData.date_of_birth}
            shortBio={formData.short_bio}
            onChange={handleChange}
          />
        );
      case "contact":
        return <ContactInfo phone={formData.phone} onChange={handleChange} />;
      case "address":
        return (
          <AddressInfo
            address={formData.address}
            onChange={handleAddressChange}
          />
        );
      case "avatar":
        return (
          <AvatarUpload
            avatar={formData.avatar}
            onAvatarChange={(value) => handleChange("avatar", value)}
          />
        );
    }
  };

  const renderProgressBar = () => {
    const steps = ["personal", "contact", "address", "avatar"];
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
          <span className={currentStep === "personal" ? "fw-bold" : ""}>
            Personal
          </span>
          <span className={currentStep === "contact" ? "fw-bold" : ""}>
            Contact
          </span>
          <span className={currentStep === "address" ? "fw-bold" : ""}>
            Address
          </span>
          <span className={currentStep === "avatar" ? "fw-bold" : ""}>
            Avatar
          </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex flex-column min-vh-100">
        <MyHeader mydefaultActiveKey="/home" className="fixed-top" />
        <Container
          className="center"
          style={{ paddingTop: "150px", width: "60%" }}
        >
          <h2 className="text-center mb-4">Build Your Profile</h2>
          {renderProgressBar()}
          <Form>
            <div className="min-vh-50" style={{ height: "35vh" }}>
              {renderStepContent()}
            </div>

            <div className="d-flex justify-content-between mt-4 fixed-bottom-buttons">
              {currentStep !== "personal" ? (
                <Button variant="secondary" onClick={previousStep}>
                  Previous
                </Button>
              ) : (
                <div></div>
              )}
              {currentStep !== "avatar" ? (
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
