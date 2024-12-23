import { Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Snapshot = () => {
  return (
    <body
      data-bs-spy="scroll"
      data-bs-target="#navbar-example2"
      data-bs-offset="0"
      style={{ overflowY: "auto" }}
      className="mb-5 mt-3"
    >
      <div className="container mt-4">
        <Card className="p-4">
          <h4 className="mb-3">About company</h4>
          <Row className="text-center mb-4">
            <Col>
              <div className="border rounded p-3">
                <p className="mb-1">company size</p>
                <h5>1000 to 5000</h5>
              </div>
            </Col>
            <Col>
              <div className="border rounded p-3">
                <p className="mb-1">Industry</p>
                <h5>Information Technology</h5>
              </div>
            </Col>
            <Col>
              <div className="border rounded p-3">
                <p className="mb-1">Headquarters</p>
                <h5>Ho Chi Minh</h5>
              </div>
            </Col>
            <Col>
              <div className="border rounded p-3">
                <p className="mb-1">company size</p>
                <h5>
                  <a href="#" className="text-decoration-none">
                    website
                  </a>
                </h5>
              </div>
            </Col>
          </Row>

          <p>
            Established in 2004, <b>DPTT</b> is the leading homegrown digital
            ecosystem in Vietnam, with diverse products serving the needs of 100
            million customers in Vietnam and many countries worldwide. TND
            focuses on four main businesses: online games, communications &
            media, fintech, and digital business. <a href="#">learn more</a>
          </p>

          <h4 className="mt-4 mb-3">Job near you</h4>
          <Row>
            <Col md={4} className="mb-3">
              <Card className="p-3 text-center">
                <h6>Associate Machine Learning Engineer, Zalopay</h6>
                <p className="text-muted">Ho Chi Minh, Viet Nam</p>
                <small>25 days ago</small>
                <Button variant="primary" className="mt-3">
                  View jobs
                </Button>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="p-3 text-center">
                <h6>Software Development Intern, Zalopay</h6>
                <p className="text-muted">Ho Chi Minh, Viet Nam</p>
                <small>30 days ago</small>
                <Button variant="primary" className="mt-3">
                  View jobs
                </Button>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="p-3 text-center">
                <h6>Game Operations Collaborator (Fresher)</h6>
                <p className="text-muted">Ho Chi Minh, Viet Nam</p>
                <small>25 days ago</small>
                <Button variant="primary" className="mt-3">
                  View jobs
                </Button>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </body>
  );
};

export default Snapshot;
