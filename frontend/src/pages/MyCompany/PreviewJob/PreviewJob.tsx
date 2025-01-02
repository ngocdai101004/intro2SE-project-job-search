import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PreviewJob.css";

const PreviewJob: React.FC = () => {
  const navigate = useNavigate();

  // State để lưu dữ liệu hiển thị
  const [jobData, setJobData] = useState<any>({});

  // Load dữ liệu từ localStorage khi render lại trang
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("jobPostData") || "{}");
    setJobData(savedData);
  }, []);

  // Điều hướng trang
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="preview-job">
      <div className="preview-job-container">
        {/* Ảnh và tiêu đề */}
        <div className="preview-job-header">
          <div className="preview-job-header-content">
            <img src="/preview-job.png" alt="Logo" />
            <div>
              <strong>
                <p className="preview-job-header-content-title">
                  Job Post Review
                </p>
              </strong>
              <p className="preview-job-header-content-description">
                The live post people view may look slightly different.
              </p>
            </div>
          </div>
          <hr
            style={{
              marginBottom: "5px",
              marginLeft: "-20px",
              marginRight: "-20px",
            }}
          />
        </div>

        {/* Nội dung chính */}
        <div className="preview-job-content">
          <div className="preview-job-content-header">
            <div className="preview-job-content-header-left">
              <strong>
                <p style={{ fontSize: "20px" }}>
                  {jobData.title || "Untitled Job"}
                </p>
              </strong>
              <p>
                {jobData.advertiseLocation || "Location not specified"} · 25
                days ago · Over 100 applicants
              </p>
              <p>
                <strong>{jobData.locationType || "Remote"}</strong> ·{" "}
                {jobData.type?.join(", ") || "N/A"}
              </p>
            </div>
            <button className="preview-job-content-header-right">
              Apply Now
            </button>
          </div>

          <hr
            style={{
              marginBottom: "5px",
              marginTop: "-10px",
              marginLeft: "-10px",
              marginRight: "-10px",
            }}
          />

          <div className="preview-job-content-description">
            {/* Description */}
            <strong>
              <p>Description:</p>
            </strong>
            <p style={{ fontSize: "1rem" }}>
              {jobData.description || "No description provided."}
            </p>

            {/* Benefits */}
            <strong>
              <p>Benefits:</p>
            </strong>
            <ul>
              {jobData.benefits && jobData.benefits.length > 0 ? (
                jobData.benefits.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>No benefits added.</li>
              )}
            </ul>

            {/* Responsibilities */}
            <strong>
              <p>Responsibilities:</p>
            </strong>
            <ul>
              {jobData.responsibilities && jobData.responsibilities.length > 0
                ? jobData.responsibilities.map(
                    (item: string, index: number) => <li key={index}>{item}</li>
                  )
                : "No responsibilities added."}
            </ul>

            {/* Requirements */}
            <strong>
              <p>Requirements:</p>
            </strong>
            <ul>
              {jobData.requirements && jobData.requirements.length > 0
                ? jobData.requirements.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))
                : "No requirements added."}
            </ul>
          </div>
        </div>

        {/* Nút đóng preview */}
        <button
          className="preview-job-close"
          onClick={() => handleNavigation("/my-company/describe-job")}
        >
          Close Preview
        </button>
      </div>
    </div>
  );
};

export default PreviewJob;
