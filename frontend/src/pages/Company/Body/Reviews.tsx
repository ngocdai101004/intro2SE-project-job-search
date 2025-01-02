/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import axiosInstance from "../../../common/axiosInstance";
import ReviewForm from "./ReviewForm";
import { IReview } from "../../../interfaces/interfaces";
import ReviewedInform from "./ReviewedInform";

interface ReviewsProps {
  company_id: string;
}

const Reviews = ({ company_id }: ReviewsProps) => {
  const [reviews, setReviews] = useState<IReview[] | null>(null);
  const [isReviewed, setIsReviewed] = useState<boolean>(false);

  const fetchReviews = async () => {
    try {
      console.log(company_id);
      const response = await axiosInstance.get(
        `/company/${company_id}/reviews`
      ); // Sử dụng company_id từ URL
      setReviews(response.data.data.reviews);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await axiosInstance.get(
        `/company/${company_id}/isReviewed`
      );
      setIsReviewed(response.data.data.isReviewed);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [company_id]);

  return (
    <div className="container">
      <Row
        style={{
          margin: "20px 0 20px 0",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        {reviews ? reviews.length : 0} reviews at DPTT Corporation
      </Row>
      <Row>
        <Col
          xs={7}
          style={{ overflow: "scroll", scrollbarWidth: "none", height: "52vh" }}
        >
          <ListGroup>
            {reviews &&
              reviews.map((review, index) => (
                <ListGroup.Item
                  className="d-flex flex-row p-3"
                  key={index}
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "8px",
                    marginBottom: "0.5rem",
                    backgroundColor: "white",
                  }}
                >
                  <Col xs={1} style={{ fontWeight: "bold", fontSize: "15px" }}>
                    {review.rating} ★
                  </Col>
                  <Col xs={11}>
                    <div className="text-muted" style={{ fontSize: "13px" }}>
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-muted" style={{ fontSize: "13px" }}>
                      {review.review}
                    </div>
                  </Col>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>

        <Col xs={5}>
          {isReviewed ? (
            <ReviewedInform setIsReviewed={setIsReviewed} />
          ) : (
            <ReviewForm company_id={company_id} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Reviews;
