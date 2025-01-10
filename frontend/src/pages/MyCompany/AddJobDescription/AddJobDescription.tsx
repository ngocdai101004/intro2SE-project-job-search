import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AddJobDescription: React.FC = () => {
  const navigate = useNavigate();
  const { company_id } = useParams<{ company_id: string }>();

  // State để lưu dữ liệu từ form
  const [description, setDescription] = useState<string>(""); // Mô tả công việc
  const [responsibilities, setResponsibilities] = useState<string[]>([""]); // Trách nhiệm
  const [requirements, setRequirements] = useState<string[]>([""]); // Yêu cầu
  const [errors, setErrors] = useState({
    description: "",
    responsibilities: [] as string[],
    requirements: [] as string[],
  }); // Lỗi cho các trường

  // Load dữ liệu từ localStorage khi render lại trang
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("jobPostData") || "{}");
    if (savedData.description) setDescription(savedData.description); // Load mô tả công việc
    if (savedData.responsibilities)
      setResponsibilities(savedData.responsibilities); // Load trách nhiệm
    if (savedData.requirements) setRequirements(savedData.requirements); // Load yêu cầu
  }, []);

  // Hàm thêm dòng mới cho Responsibilities
  const addResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
    setErrors({
      ...errors,
      responsibilities: [...errors.responsibilities, ""],
    });
  };

  // Hàm thêm dòng mới cho Requirements
  const addRequirement = () => {
    setRequirements([...requirements, ""]);
    setErrors({
      ...errors,
      requirements: [...errors.requirements, ""],
    });
  };

  // Xử lý thay đổi nội dung Responsibilities
  const handleResponsibilityChange = (index: number, value: string) => {
    const updated = [...responsibilities];
    updated[index] = value;
    setResponsibilities(updated);

    // Xóa lỗi khi người dùng nhập
    const updatedErrors = [...errors.responsibilities];
    updatedErrors[index] = value.trim() ? "" : "This field is required.";
    setErrors({ ...errors, responsibilities: updatedErrors });
  };

  // Xử lý thay đổi nội dung Requirements
  const handleRequirementChange = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);

    // Xóa lỗi khi người dùng nhập
    const updatedErrors = [...errors.requirements];
    updatedErrors[index] = value.trim() ? "" : "This field is required.";
    setErrors({ ...errors, requirements: updatedErrors });
  };

  // Lưu dữ liệu vào localStorage và chuyển tiếp
  const handleSaveAndContinue = () => {
    // Validation
    const responsibilityErrors = responsibilities.map((res) =>
      res.trim() ? "" : "This field is required."
    );
    const requirementErrors = requirements.map((req) =>
      req.trim() ? "" : "This field is required."
    );

    const hasErrors =
      !description.trim() ||
      responsibilityErrors.some((err) => err !== "") ||
      requirementErrors.some((err) => err !== "");

    if (hasErrors) {
      setErrors({
        description: description.trim() ? "" : "Job description is required.",
        responsibilities: responsibilityErrors,
        requirements: requirementErrors,
      });
      return;
    }

    const currentData = {
      description, // Thêm mô tả công việc
      responsibilities,
      requirements,
    };

    // Lưu dữ liệu vào localStorage
    const existingData = JSON.parse(
      localStorage.getItem("jobPostData") || "{}"
    );
    localStorage.setItem(
      "jobPostData",
      JSON.stringify({ ...existingData, ...currentData })
    );

    localStorage.setItem(
      "currentPage",
      `/my-company/${company_id}/describe-job`
    );
    // Chuyển đến trang tiếp theo
    navigate(`/my-company/${company_id}/describe-job`);
  };

  return (
    <MainLayout company_id={company_id!}>
      <Container fluid className="job-post-container">
        <Row>
          <Col>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "60vh" }}
            >
              <div
                className="content p-4"
                style={{ maxWidth: "600px", width: "100%" }}
              >
                <header className="header mb-3">
                  <h1>Add job description</h1>
                  <hr />
                </header>

                {/* Job Description */}
                <Form.Group className="mb-3">
                  <strong>
                    Job Description{" "}
                    <span className="required" style={{ color: "red" }}>
                      *
                    </span>
                  </strong>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter job description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setErrors({
                        ...errors,
                        description: e.target.value.trim()
                          ? ""
                          : "Job description is required.",
                      });
                    }}
                    isInvalid={!!errors.description}
                    className="mb-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Responsibilities */}
                <Form.Group className="mb-3">
                  <strong>
                    Responsibilities{" "}
                    <span className="required" style={{ color: "red" }}>
                      *
                    </span>
                  </strong>
                  {responsibilities.map((responsibility, index) => (
                    <div key={index} className="mb-2">
                      <Form.Control
                        type="text"
                        placeholder={`Responsibility ${index + 1}`}
                        value={responsibility}
                        onChange={(e) =>
                          handleResponsibilityChange(index, e.target.value)
                        }
                        isInvalid={!!errors.responsibilities[index]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.responsibilities[index]}
                      </Form.Control.Feedback>
                    </div>
                  ))}
                  <Button
                    variant="outline-secondary"
                    onClick={addResponsibility}
                  >
                    + Add Responsibility
                  </Button>
                </Form.Group>

                {/* Requirements */}
                <Form.Group className="mb-3">
                  <strong>
                    Requirements{" "}
                    <span className="required" style={{ color: "red" }}>
                      *
                    </span>
                  </strong>
                  {requirements.map((requirement, index) => (
                    <div key={index} className="mb-2">
                      <Form.Control
                        type="text"
                        placeholder={`Requirement ${index + 1}`}
                        value={requirement}
                        onChange={(e) =>
                          handleRequirementChange(index, e.target.value)
                        }
                        isInvalid={!!errors.requirements[index]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.requirements[index]}
                      </Form.Control.Feedback>
                    </div>
                  ))}
                  <Button variant="outline-secondary" onClick={addRequirement}>
                    + Add Requirement
                  </Button>
                </Form.Group>

                {/* Button điều hướng */}
                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      navigate(
                        `/my-company/${company_id}/add-pays-and-benefits`
                      )
                    }
                  >
                    ← Back
                  </Button>
                  <Button variant="primary" onClick={handleSaveAndContinue}>
                    Continue →
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default AddJobDescription;
