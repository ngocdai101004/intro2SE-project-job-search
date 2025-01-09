import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { MyToastContainer } from "../../components/MyToastContainer.tsx";
import Summary from "./BuildJobSearchCVSteps/Summary";
import Education from "./BuildJobSearchCVSteps/Education";
import Qualifications from "./BuildJobSearchCVSteps/Qualifications";
import Skills from "./BuildJobSearchCVSteps/Skills";
import Experience from "./BuildJobSearchCVSteps/Experience";
import Certifications from "./BuildJobSearchCVSteps/Certifications";
import JobPreferences from "./BuildJobSearchCVSteps/JobPreferences";
import ReviewStep from "./BuildJobSearchCVSteps/ReviewJobSearchCV";
import axiosInstance from "../../common/axiosInstance";
import axios from "axios";
import { useEffect } from "react";
import {
  ResumeData,
  IEducation,
  IQualification,
  IExperience,
  ICertification,
  IJobPreference,
} from "../../interfaces/userinfo";
import MyHeader from "../../components/MyHeader.tsx";
import { useNavigate } from "react-router-dom";
type FormStep =
  | "summary"
  | "education"
  | "qualifications"
  | "skills"
  | "experience"
  | "certifications"
  | "jobPreferences"
  | "review";

interface Props {
  isFirstTime?: boolean;
}
const ResumeForm: React.FC<Props> = ({ isFirstTime }) => {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(
    isFirstTime || true
  );
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FormStep>("summary");
  const [education, setEducation] = useState<IEducation[]>([]);
  const [qualifications, setQualifications] = useState<IQualification[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<IExperience[]>([]);
  const [certifications, setCertifications] = useState<ICertification[]>([]);
  const [jobPreferences, setJobPreferences] = useState<IJobPreference[]>([]);
  const [readyToWork, setReadyToWork] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>("");
  const [resume, setResume] = useState<string[]>([]);

  const [formData, setFormData] = useState<ResumeData>({
    summary: summary,
    education: education,
    qualifications: qualifications,
    skills: skills,
    experience: experience,
    certifications: certifications,
    job_preferences: jobPreferences,
    ready_to_work: readyToWork,
    resume: resume,
  });

  useEffect(() => {
    setFormData({
      summary: summary,
      education: education,
      qualifications: qualifications,
      skills: skills,
      experience: experience,
      certifications: certifications,
      job_preferences: jobPreferences,
      ready_to_work: readyToWork,
      resume: resume,
    });
  }, [
    summary,
    education,
    qualifications,
    skills,
    experience,
    certifications,
    jobPreferences,
    readyToWork,
    resume,
  ]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/user/profile/info");
        if (response.status === 200) {
          const data = response.data.data.userInfo;
          setSummary(data.summary);
          setResume(data.resume);
          setEducation(data.education);
          setQualifications(data.qualifications);
          setSkills(data.skills);
          setExperience(data.experience);
          setCertifications(data.certifications);
          setJobPreferences(data.job_preferences);
          setReadyToWork(data.ready_to_work);
          setIsFirstTimeUser(false);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const steps: FormStep[] = [
    "summary",
    "education",
    "qualifications",
    "skills",
    "experience",
    "certifications",
    "jobPreferences",
    "review",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit resume");
    const toastId = toast.loading("Updating resume...");

    try {
      setFormData(validateData(formData));
      if (isFirstTimeUser === true) {
        const response = await axiosInstance.post(
          "/user/profile/info",
          formData
        );
        console.log("Resume updated:", response.data);
        toast.update(toastId, {
          render: "Resume updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          onClose: () => navigate("/home"),
        });
      } else {
        const response = await axiosInstance.put(
          "/user/profile/info",
          formData
        );
        console.log("Resume updated:", response.data);
        toast.update(toastId, {
          render: "Resume updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // Display error from server
        toast.update(toastId, {
          render: error.response.data?.message || "An error occurred.",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        // Handle general error
        toast.update(toastId, {
          render: "Error updating resume. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        console.error("Error updating resume:", error);
      }
    }
  };

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const previousStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const renderProgressBar = () => {
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
        <div className="d-flex justify-content-between mt-2 text-muted small">
          {steps.map((step) => (
            <span
              key={step}
              className={currentStep === step ? "fw-bold text-primary" : ""}
            >
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const validateData = (data: ResumeData) => {
    const isNonEmptyString = (str: string) => str.trim() !== "";
    const filteredEducation = data.education.filter(
      (edu) =>
        isNonEmptyString(edu.education_level) &&
        isNonEmptyString(edu.study_field) &&
        isNonEmptyString(edu.school_name)
    );
    const filteredExperience = data.experience.filter(
      (exp) =>
        isNonEmptyString(exp.job_title) && isNonEmptyString(exp.company_name)
    );
    const filteredJobPreferences = data.job_preferences.filter(
      (pref) =>
        isNonEmptyString(pref.job_title) && isNonEmptyString(pref.industry)
    );
    const filteredQualifications = data.qualifications.filter((qual) =>
      isNonEmptyString(qual.title)
    );
    const filteredCertifications = data.certifications.filter(
      (cert) =>
        isNonEmptyString(cert.name) &&
        isNonEmptyString(cert.issuing_organization)
    );
    return {
      ...data,
      education: filteredEducation,
      experience: filteredExperience,
      job_preferences: filteredJobPreferences,
      qualifications: filteredQualifications,
      certifications: filteredCertifications,
    };
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case "summary":
        return (
          <Summary
            summary={summary}
            setSummary={setSummary}
            resume={resume}
            setResume={setResume}
          />
        );
      case "education":
        return <Education education={education} setEducation={setEducation} />;
      case "qualifications":
        return (
          <Qualifications
            qualifications={qualifications}
            setQualifications={setQualifications}
          />
        );
      case "skills":
        return <Skills skills={skills} setSkills={setSkills} />;
      case "experience":
        return (
          <Experience experience={experience} setExperience={setExperience} />
        );
      case "certifications":
        return (
          <Certifications
            certifications={certifications}
            setCertifications={setCertifications}
          />
        );
      case "jobPreferences":
        return (
          <JobPreferences
            job_preferences={jobPreferences}
            setJobPreferences={setJobPreferences}
            ready_to_work={readyToWork}
            setReadyToWork={setReadyToWork}
          />
        );
      case "review":
        return <ReviewStep data={validateData(formData)} />;
      default:
        return <></>;
    }
    return <></>;
  };

  return (
    <div>
      <div className="d-flex flex-column min-vh-80">
        <MyHeader mydefaultActiveKey="/home" className="fixed-top" />
        <Container
          className="py-5 center"
          style={{ width: "80%", marginTop: "5%" }}
        >
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">Build Your Resume</h2>
              {renderProgressBar()}

              <Form>
                <div className="min-vh-50 mb-4">{renderStepContent()}</div>

                <div className="d-flex justify-content-between">
                  {currentStep !== "summary" && (
                    <Button variant="outline-primary" onClick={previousStep}>
                      Previous
                    </Button>
                  )}

                  {currentStep !== "review" ? (
                    <Button variant="primary" onClick={nextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      type="button"
                      style={{ marginRight: "10px" }}
                      onClick={handleSubmit}
                    >
                      Save Resume
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
          <MyToastContainer />
        </Container>
      </div>
    </div>
  );
};

export default ResumeForm;
