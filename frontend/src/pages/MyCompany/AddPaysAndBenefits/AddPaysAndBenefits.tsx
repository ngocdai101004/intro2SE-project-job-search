import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";

const AddPaysAndBenefits: React.FC = () => {
  const navigate = useNavigate();

  // State để lưu dữ liệu từ form
  const [payType, setPayType] = useState("Range");
  const [minimumPay, setMinimumPay] = useState("");
  const [maximumPay, setMaximumPay] = useState("");
  const [rate, setRate] = useState("per month");

  // Load dữ liệu từ localStorage khi render lại trang
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("jobPostData") || "{}");
    if (savedData.payType) setPayType(savedData.payType);
    if (savedData.minimumPay) setMinimumPay(savedData.minimumPay);
    if (savedData.maximumPay) setMaximumPay(savedData.maximumPay);
    if (savedData.rate) setRate(savedData.rate);
  }, []);

  // Lưu dữ liệu vào localStorage và chuyển tiếp
  const handleSaveAndContinue = () => {
    const currentData = {
      payType,
      salary: payType === "Fixed" ? minimumPay : `${minimumPay}-${maximumPay}`, // Xử lý format salary
      rate,
    };

    // Lưu dữ liệu vào localStorage
    const existingData = JSON.parse(
      localStorage.getItem("jobPostData") || "{}"
    );
    localStorage.setItem(
      "jobPostData",
      JSON.stringify({ ...existingData, ...currentData })
    );

    // Chuyển đến trang tiếp theo
    navigate("/my-company/add-job-description");
  };

  const handleBack = () => {
    navigate("/my-company/add-job-details");
  };

  return (
    <MainLayout>
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
                    <div className="d-flex gap-2 mb-5">
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

                      {/* Đơn vị lương */}
                      <Form.Select
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                      >
                        <option value="per hour">per hour</option>
                        <option value="per day">per day</option>
                        <option value="per week">per week</option>
                        <option value="per month">per month</option>
                        <option value="per year">per year</option>
                      </Form.Select>
                    </div>
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
