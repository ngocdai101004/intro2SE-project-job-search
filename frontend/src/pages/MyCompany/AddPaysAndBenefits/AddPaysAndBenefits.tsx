import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AddPaysAndBenefits: React.FC = () => {
  const navigate = useNavigate();
  const { company_id } = useParams<{ company_id: string }>();

  // State để lưu dữ liệu từ form
  const [payType, setPayType] = useState("Range");
  const [minimumPay, setMinimumPay] = useState("");
  const [maximumPay, setMaximumPay] = useState("");
  const [benefits, setBenefits] = useState<string[]>([""]); // Danh sách lợi ích

  // Load dữ liệu từ localStorage khi render lại trang
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("jobPostData") || "{}");
    if (savedData.minimumPay) setMinimumPay(savedData.minimumPay);
    if (savedData.maximumPay) setMaximumPay(savedData.maximumPay);
    if (savedData.benefits) setBenefits(savedData.benefits);
  }, []);

  // Thêm dòng mới cho lợi ích
  const addBenefit = () => {
    setBenefits([...benefits, ""]);
  };

  // Xử lý thay đổi nội dung cho lợi ích
  const handleBenefitChange = (index: number, value: string) => {
    const updated = [...benefits];
    updated[index] = value;
    setBenefits(updated);
  };

  // Lưu dữ liệu vào localStorage và chuyển tiếp
  const handleSaveAndContinue = () => {
    const currentData = {
      salary: {
        min: minimumPay,
        max: payType === "Fixed" ? minimumPay : maximumPay, // Nếu Fixed thì min = max
      },
      benefits,
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
      `/my-company/${company_id}/add-job-description`
    );

    // Chuyển đến trang tiếp theo
    navigate(`/my-company/${company_id}/add-job-description`);
  };

  const handleBack = () => {
    navigate(`/my-company/${company_id}/add-job-details`);
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
                  <h1>Add pays and benefits</h1>
                  <hr />
                </header>

                {/* Form thêm thông tin */}
                <Form>
                  <Form.Group className="mb-3">
                    <strong>
                      <Form.Label column sm={12} className="text-left">
                        Pay
                      </Form.Label>
                    </strong>
                    <div className="d-flex gap-2 mb-3">
                      {/* Chọn loại lương */}
                      <Form.Select
                        value={payType}
                        onChange={(e) => setPayType(e.target.value)}
                      >
                        <option value="Range">Range</option>
                        <option value="Fixed">Fixed</option>
                      </Form.Select>

                      {/* Mức lương tối thiểu */}
                      <Form.Select
                        value={minimumPay}
                        onChange={(e) => setMinimumPay(e.target.value)}
                      >
                        {[...Array(21)].map((_, i) => (
                          <option key={i} value={i * 10000}>
                            {i * 10000}
                          </option>
                        ))}
                      </Form.Select>

                      {/* Mức lương tối đa */}
                      {payType === "Range" && (
                        <Form.Select
                          value={maximumPay}
                          onChange={(e) => setMaximumPay(e.target.value)}
                        >
                          {[...Array(21)].map((_, i) => (
                            <option key={i} value={i * 10000}>
                              {i * 10000}
                            </option>
                          ))}
                        </Form.Select>
                      )}
                    </div>
                  </Form.Group>

                  {/* Benefits Section */}
                  <Form.Group className="mb-3">
                    <strong>
                      <Form.Label column sm={12} className="text-left">
                        Benefits
                      </Form.Label>
                    </strong>
                    {benefits.map((benefit, index) => (
                      <Form.Control
                        key={index}
                        type="text"
                        placeholder={`Benefit ${index + 1}`}
                        value={benefit}
                        onChange={(e) =>
                          handleBenefitChange(index, e.target.value)
                        }
                        className="mb-2"
                      />
                    ))}
                    <Button variant="outline-secondary" onClick={addBenefit}>
                      + Add Benefit
                    </Button>
                  </Form.Group>

                  {/* Button điều hướng */}
                  <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={handleBack}>
                      ← Back
                    </Button>
                    <Button variant="primary" onClick={handleSaveAndContinue}>
                      Continue →
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default AddPaysAndBenefits;
