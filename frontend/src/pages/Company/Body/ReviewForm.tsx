import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IReview } from "../../../interfaces/interfaces";
import axiosInstance from "../../../common/axiosInstance";
import { MyToastContainer } from "../../../components/MyToastContainer";
import { toast } from "react-toastify";

interface ReviewFormProps {
  company_id: string;
  firstTime: boolean;
}

const ReviewForm = ({ company_id, firstTime }: ReviewFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const handleRating = (index: number): void => {
    setRating(index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Updating...");

    const reviewData: IReview = {
      rating,
      review,
      date: new Date(),
    };

    try {
      await axiosInstance.post(`/company/${company_id}/review`, reviewData);
      setRating(0);
      setReview("");

      // Chuyển hướng đến trang khác sau khi gửi thành công
      toast.update(toastId, {
        render: firstTime ? "Created successfully." : "Updated successfully.",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        onClose: () => window.location.reload(),
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      // Hiển thị lỗi
      toast.update(toastId, {
        render: error.response.data.message || "An error occurred.",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div
      style={{
        overflow: "scroll",
        scrollbarWidth: "none",
        height: "52vh",
        border: "1px solid lightgray",
        borderRadius: "12px",
      }}
    >
      <div
        className="p-4"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h5 className="mb-3">Share your anonymous review</h5>
        <div className="mb-4 d-flex align-items-center">
          <strong className="me-3">Rate this company</strong>
          <div className="d-flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                style={{
                  fontSize: "24px",
                  cursor: "pointer",
                  color: star <= rating ? "#FFD700" : "#ccc",
                  marginRight: "4px",
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="reviewTextarea" className="mb-4">
            <Form.Label>
              <strong>Write your review</strong>
            </Form.Label>
            <Form.Text className="text-muted">
              <div>Give us your opinion about:</div>
              <ul>
                <li>a typical day at work,</li>
                <li>management,</li>
                <li>workplace culture,</li>
                <li>the hardest part of the job,</li>
                <li>the most enjoyable part of the job</li>
              </ul>
            </Form.Text>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Type your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </Form.Group>
          <Row className="text-end">
            <Col>
              <Button variant="primary" type="submit">
                Send
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <MyToastContainer />
    </div>
  );
};

export default ReviewForm;
