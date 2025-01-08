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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token"); // Kiểm tra người dùng đã đăng nhập chưa
  });

  const [showModal, setShowModal] = useState<boolean>(false); // Trạng thái hiển thị modal
  const [resume, setResume] = useState<File | null>(null); // Lưu file resume
  const [uploading, setUploading] = useState<boolean>(false); // Trạng thái upload

  const handleApplyNow = () => {
    // if (isAuthenticated) {
    // } else {
    //   navigate("/signin"); // Nếu chưa đăng nhập, điều hướng đến trang đăng nhập
    // }
    setShowModal(true); // Nếu đã đăng nhập, hiển thị modal upload resume
  };

  // Hàm xử lý file khi người dùng chọn
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

      // Đọc dữ liệu file thành ArrayBuffer
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as ArrayBuffer);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(resume);
      });

      // Chuyển đổi ArrayBuffer thành Buffer
      const buffer = NodeBuffer.from(arrayBuffer);

      // Tạo đối tượng IFile theo đúng định dạng
      const file: IFile = {
        filename: resume.name,
        buffer: buffer,
        mimetype: resume.type,
      };

      // Upload file lên S3
      const url = await uploadFile("resumes", file);

      // Gửi thông tin ứng tuyển lên server
      await axiosInstance.post("/application/apply", {
        job_id: job._id,
        resume_url: url,
      });

      alert("Application submitted successfully!");
      setShowModal(false); // Đóng modal sau khi gửi thành công
    } catch (error) {
      console.error("Failed to apply:", error);
      alert("Failed to submit application. Please try again.");
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
