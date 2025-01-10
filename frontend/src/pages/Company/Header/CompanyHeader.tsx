import React, { useEffect, useState } from "react";
import { Col, Nav, Row, Image, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../common/axiosInstance";
import { toast } from "react-toastify";
import ICompany from "../../../interfaces/company";

interface CompanyHeaderProps {
  myState?: string;
  setMyState?: React.Dispatch<React.SetStateAction<string>>;
  companyData: ICompany;
}

const CompanyHeader = ({
  myState,
  setMyState,
  companyData,
}: CompanyHeaderProps) => {
  const myActiveKey = myState || "/snapshot";
  const [followed, setFollowed] = useState<boolean>(false);
  const [companyRating, setCompanyRating] = useState(0);
  const [follows, setFollows] = useState<number>(0);
  const setMyActiveKey = setMyState || (() => {});
  const navigate = useNavigate();

  const fetchFollowed = async () => {
    try {
      console.log("company id: ", companyData?._id);
      if (companyData?._id !== undefined) {
        const response = await axiosInstance.get(
          `/company/${companyData?._id}/isFollowed`
        );
        console.log(response.data.message);
        if (response.data.data.isFollowed !== undefined) {
          setFollowed(response.data.data.isFollowed);
          return true;
        } else {
          return false;
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      console.error(error);
    }
    return false;
  };

  useEffect(() => {
    setFollows(companyData?.followers?.length || 0);
    if (companyData) {
      fetchFollowed();
    }
    const sumRating =
      companyData?.reviews?.reduce(
        (acc, review) => acc + (review.rating || 0),
        0
      ) || 0;

    const len =
      (companyData?.reviews?.length || 0) == 0
        ? 1
        : companyData?.reviews?.length || 1;
    const rating = sumRating / len;

    setCompanyRating(rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyData]);

  const handleFollow = async () => {
    const toastId = toast.loading("Updating...");
    if (await fetchFollowed()) {
      if (followed) {
        await axiosInstance.post(`/company/${companyData?._id}/unfollow`);
        setFollowed(false);
        setFollows(follows - 1);

        toast.update(toastId, {
          render: "Unfollow this company successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        await axiosInstance.post(`/company/${companyData?._id}/follow`);
        setFollowed(true);
        setFollows(follows + 1);

        toast.update(toastId, {
          render: "Follow this company successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } else {
      toast.update(toastId, {
        render: "failed to fetch followed status",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="bg-cyan py-3 pb-0">
      <Container>
        {/* Header Section */}
        <Row>
          <Col
            xs={9}
            className="col-auto d-flex mb-3 mb-md-0"
            style={{ backgroundColor: "#00000000", border: "none" }}
          >
            <Row>
              <Col xs="auto" className="d-flex justify-content-center">
                <Image
                  src={companyData?.avatar || "/company-avatar.jpg"} // Đặt đường dẫn tới logo
                  roundedCircle
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              </Col>
              <Col className="d-flex flex-column justify-content-center">
                <h5 className="mb-1">
                  {companyData?.company_name || "Fusodoya Company"}
                </h5>
                <div className="d-flex align-items-center mb-1">
                  <span className="me-2 text-primary fw-bold">
                    {companyRating.toFixed(2)}
                  </span>
                  <div className="text-warning">
                    {"★".repeat(Math.floor(companyRating))}
                    {"☆".repeat(5 - Math.floor(companyRating))}
                  </div>
                  <small className="text-muted ms-2">
                    {companyData?.reviews?.length || 0} reviews
                  </small>
                </div>
                <small className="text-muted">
                  {companyData?.applicant?.length || 0} others have applied here
                </small>
              </Col>
            </Row>
          </Col>

          <Col xs={3} style={{ backgroundColor: "#00000000", border: "none" }}>
            <Row className="mb-2 d-flex justify-content-between">
              <Col xs="auto" className="d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleFollow();
                  }}
                >
                  {followed ? "Unfollow" : "Follow"}
                </button>
              </Col>
              <Col xs="auto" className="d-flex justify-content-center">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    navigate("./../reviews");
                    window.location.reload();
                  }}
                >
                  Write a review
                </button>
              </Col>
            </Row>
            <Row>
              <Col xs="auto" className="d-flex justify-content-center">
                <small className="text-muted"> {follows} followers</small>
              </Col>
              <Col xs="auto" className="d-flex justify-content-center ms-5">
                <small className="text-muted">
                  {companyData ? companyData.employees?.length : 0} employees{" "}
                </small>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Navbar Section */}
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <Nav
              className="mx-auto"
              variant="underline"
              activeKey={myActiveKey}
              onSelect={(selectedKey) =>
                setMyActiveKey(selectedKey || "/snapshot")
              }
            >
              <Nav.Item className="me-2 me-md-5">
                <Nav.Link
                  eventKey="/snapshot"
                  href="snapshot"
                  className="text-dark fs-5"
                >
                  Snapshot
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className="me-2 me-md-5">
                <Nav.Link
                  eventKey="/jobs"
                  href={"jobs"}
                  className="text-dark fs-5"
                >
                  Jobs
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className="me-2 me-md-5">
                <Nav.Link
                  eventKey="/reviews"
                  href="reviews"
                  className="text-dark fs-5"
                >
                  Reviews
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default CompanyHeader;
