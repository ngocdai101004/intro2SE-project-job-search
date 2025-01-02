import { Card, Button, Container, Col, Row } from "react-bootstrap";
import { IJob } from "../../../interfaces/interfaces";

interface headerProps {
  job: IJob;
}

const JobDetail = ({ job }: headerProps) => {
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
      <Card className="my-4 mt-0 mb-20px" style={{ border: "none" }}>
        <Card.Body>
          <Card.Title
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            {job.title}
          </Card.Title>
          {/* <Card.Subtitle className="mb-2 text-muted">
            {job.location}
          </Card.Subtitle> */}
          <Container className="mb-0" style={{ fontSize: "0.9rem" }}>
            <Row className="mb-3">
              <Col md="auto" className="me-3">
                {job.description}
              </Col>
              <Col md="auto" className="me-3">
                {job.createdAt}
              </Col>
              <Col md="auto" className="me-3">
                Over {job.number_of_peoples} applicants
              </Col>
            </Row>
            <Row>
              <Col md="auto" className="me-3">
                {job.location_type}{" "}
              </Col>
              <Col md="auto" className="me-3">
                {job.type}{" "}
              </Col>
              <Col md="auto" className="me-3">
                {job.title}{" "}
              </Col>
              <Col md="auto" className="ms-auto">
                <Button variant="primary" style={{ fontSize: "0.9rem" }}>
                  Apply Now
                </Button>
              </Col>
            </Row>
          </Container>

          <hr style={{ borderTop: "1px solid gray", margin: "1rem 0" }} />

          <Card.Text style={{ fontSize: "0.9rem" }}>
            <strong>About the job</strong>
          </Card.Text>
          <Card.Text style={{ fontSize: "0.85rem" }}>
            Established in 2004, DPTT is the leading homegrown digital ecosystem
            in Vietnam and many countries worldwide. DPTT focuses on our main
            businesses: online payments, e-commerce, and fintech.
          </Card.Text>
          <Card.Text style={{ fontSize: "0.9rem" }}>
            <strong>Requirement</strong>
          </Card.Text>
          <ul style={{ fontSize: "0.85rem" }}>
            <li>
              Final year or graduated within 1 year majoring in IT with good or
              excellent academic performance
            </li>
            <li>
              Understanding of data structures, algorithms, and object-oriented
              programming
            </li>
            <li>
              Clear thinking, quick learning, and strong commitment, and
              eagerness to lead
            </li>
            <li>
              Availability for full-time and part-time work (at least 3 days per
              week)
            </li>
          </ul>
          <Card.Text style={{ fontSize: "0.9rem" }}>
            <strong>Qualifications</strong>
          </Card.Text>
          <ul style={{ fontSize: "0.85rem" }}>
            <li>
              Ability to think critically, analyze and solve problems with a
              strong attention to detail.
            </li>
            <li>
              Experience with SQL and NoSQL query (e.g., MySQL, MongoDB);
              proficiency in Python or Excel is a plus.
            </li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobDetail;
