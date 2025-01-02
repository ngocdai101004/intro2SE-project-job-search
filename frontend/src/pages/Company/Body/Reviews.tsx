import { useEffect, useState } from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import axiosInstance from "../../../common/axiosInstance";
import ReviewForm from "./ReviewForm";

const jobInstance = {
  id: 1,
  title: "Associate Machine Learning Engineer, Zalopay Hehehe",
  location: "Ho Chi Minh, Viet Nam",
  date: "25 days ago",
  description:
    "Zalopay is looking for an Associate Machine Learning Engineer to join our team. You will be responsible for developing machine learning models and deploying them to production.",
  requirements: [
    "Bachelor's degree in Computer Science or related field",
    "Experience with Python and machine learning libraries",
    "Experience with cloud computing platforms",
  ],
  employmentType: "Full-time", // Loại hình việc làm
  workMode: "On-site", // Hình thức làm việc
  applicantCount: 150, // Số lượng ứng viên
  level: "Internship", // Cấp độ công việc
};

interface ReviewsProps {
  company_id: string;
}

const Reviews = ({ company_id }: ReviewsProps) => {
  const [reviews, setReviews] = useState(
    Array(10)
      .fill(jobInstance)
      .map((job, index) => ({ ...job, id: index }))
  );

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
        {reviews.length} reviews at DPTT Corporation
      </Row>
      <Row>
        <Col
          xs={7}
          style={{ overflow: "scroll", scrollbarWidth: "none", height: "52vh" }}
        >
          <ListGroup>
            {reviews.map((review, index) => (
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
          <ReviewForm company_id={company_id} />
          {/* {selectedJob ? <JobDetail job={selectedJob} /> : <> </>} */}
        </Col>
      </Row>
    </div>
  );
};

export default Reviews;
