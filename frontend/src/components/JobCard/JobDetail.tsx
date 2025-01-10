import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { JobDetailProps } from "../../interfaces/job";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../common/axiosInstance";
import { uploadFile } from "../../utils/s3";
import IFile from "../../interfaces/file";
import { Buffer as NodeBuffer } from "buffer";

const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState<boolean>(false); // Trạng thái hiển thị modal
  const [resume, setResume] = useState<File | null>(null); // Lưu file resume
  const [uploading, setUploading] = useState<boolean>(false); // Trạng thái upload

  const handleApplyNow = async () => {
    try {
      const response = await axiosInstance.get("/user/profile");
      if (response.data) {
        setShowModal(true);
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.log("User not signin:", error);
      navigate("/signin");
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!resume) {
      alert("Please select a resume file.");
      return;
    }

    try {
      setUploading(true);

      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as ArrayBuffer);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(resume);
      });

      const buffer = NodeBuffer.from(arrayBuffer);

      const file: IFile = {
        filename: resume.name,
        buffer: buffer,
        mimetype: resume.type,
      };

      // Upload file lên S3
      const url = await uploadFile("resumes", file);

      console.log("Resume URL:", url);

      const response = await axiosInstance.get("/user/profile");

      await axiosInstance.post("/applicant/apply", {
        job_id: job._id,
        user_id: response.data.data.user._id,
        resume_url: url,
        status: "reviewing",
        feedback: "",
      });

      setShowModal(false); 
    } catch (error) {
      console.error("Failed to apply:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="card-title font-weight-bold">{job.title}</h3>
            <div className="d-flex align-items-center mb-2">
              <img
                src={job.company_avatar}
                alt={job.company_name}
                className="rounded-circle"
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              />
              <span>{job.company_name}</span>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-start">
            <p
              className="card-text"
              style={{
                fontWeight: "bold",
                marginRight: "20px",
                fontSize: "14px",
              }}
            >
              {job.type}
            </p>
            <p
              className="card-text"
              style={{
                fontWeight: "bold",
                marginRight: "20px",
                fontSize: "14px",
              }}
            >
              {job.location_type}
            </p>
            <p
              className="card-text"
              style={{
                fontWeight: "bold",
                marginRight: "20px",
                fontSize: "14px",
              }}
            >
              {job.number_of_peoples} available positions
            </p>
            {job.salary && (
              <p
                className="card-text"
                style={{ fontWeight: "bold", fontSize: "14px" }}
              >
                {job.salary.min === job.salary.max
                  ? `Salary: $${job.salary.min}`
                  : `Salary: $${job.salary.min} - $${job.salary.max}`}
              </p>
            )}
          </div>
          <Button
            variant="primary"
            style={{
              fontSize: "0.9rem",
              marginTop: "-20px",
              marginRight: "10px",
            }}
            onClick={handleApplyNow}
          >
            Apply Now
          </Button>
        </div>
        <hr style={{ width: "100%", margin: "0" }} />
        <div className="card-text" style={{ marginTop: "30px" }}>
          <h5>Description</h5>
          <ReactMarkdown className="card-text">{job.description}</ReactMarkdown>
        </div>
        {/* Modal để upload resume */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Resume</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select your resume</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Submit Application"}
            </Button>
          </Modal.Footer>
        </Modal>

        {job.requirements && (
          <div className="card-text" style={{ marginTop: "20px" }}>
            <h5>Requirements</h5>
            <ul>
              {job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>
        )}
        {job.benefits && (
          <div className="card-text" style={{ marginTop: "20px" }}>
            <h5>Benefits</h5>
            <ul>
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}
        {job.responsibilities && (
          <div className="card-text" style={{ marginTop: "20px" }}>
            <h5>Responsibilities</h5>
            <ul>
              {job.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
