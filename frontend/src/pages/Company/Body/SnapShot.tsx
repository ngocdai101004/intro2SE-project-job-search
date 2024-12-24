import { Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Snapshot = () => {
  return (
    <div
      className="container mt-4"
      style={{ overflow: "scroll", scrollbarWidth: "none", height: "60vh" }}
    >
      <Card className="p-4">
        <h4 className="mb-3" style={{ fontSize: "1.2rem" }}>
          {" "}
          {/* Giảm kích thước chữ tiêu đề */}
          About company
        </h4>
        <Row className="text-center mb-4 d-flex">
          <Col className="d-flex align-items-stretch">
            <div className="border rounded p-3 flex-fill">
              <p className="mb-1" style={{ fontSize: "0.9rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                Company Size
              </p>
              <h5 style={{ fontSize: "1rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                1000 to 5000
              </h5>
            </div>
          </Col>
          <Col className="d-flex align-items-stretch">
            <div className="border rounded p-3 flex-fill">
              <p className="mb-1" style={{ fontSize: "0.9rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                Industry
              </p>
              <h5 style={{ fontSize: "1rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                Information Technology
              </h5>
            </div>
          </Col>
          <Col className="d-flex align-items-stretch">
            <div className="border rounded p-3 flex-fill">
              <p className="mb-1" style={{ fontSize: "0.9rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                Headquarters
              </p>
              <h5 style={{ fontSize: "1rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                Ho Chi Minh
              </h5>
            </div>
          </Col>
          <Col className="d-flex align-items-stretch">
            <div className="border rounded p-3 flex-fill">
              <p className="mb-1" style={{ fontSize: "0.9rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                Website
              </p>
              <h5 style={{ fontSize: "1rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                <a href="#" className="text-decoration-none">
                  website
                </a>
              </h5>
            </div>
          </Col>
        </Row>
        <p style={{ fontSize: "0.85rem" }}>
          {" "}
          {/* Giảm kích thước chữ */}
          Established in 2004, <b>DPTT</b> is the leading homegrown digital
          ecosystem in Vietnam, with diverse products serving the needs of 100
          million customers in Vietnam and many countries worldwide. TND focuses
          on four main businesses: online games, communications & media,
          fintech, and digital business. <a href="#">learn more</a>
        </p>

        <h4 className="mt-4 mb-3" style={{ fontSize: "1.2rem" }}>
          {" "}
          {/* Giảm kích thước chữ tiêu đề */}
          Job near you
        </h4>
        <Row>
          <Col md={4} className="mb-3">
            <Card className="p-3 text-center">
              <h6 style={{ fontSize: "1rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                Associate Machine Learning Engineer, Zalopay
              </h6>
              <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                Ho Chi Minh, Viet Nam
              </p>
              <small style={{ fontSize: "0.75rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                25 days ago
              </small>
              <Button variant="primary" className="mt-3">
                View jobs
              </Button>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="p-3 text-center">
              <h6 style={{ fontSize: "1rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                Software Development Intern, Zalopay
              </h6>
              <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                Ho Chi Minh, Viet Nam
              </p>
              <small style={{ fontSize: "0.75rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                30 days ago
              </small>
              <Button variant="primary" className="mt-3">
                View jobs
              </Button>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="p-3 text-center">
              <h6 style={{ fontSize: "1rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                Game Operations Collaborator (Fresher)
              </h6>
              <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                Ho Chi Minh, Viet Nam
              </p>
              <small style={{ fontSize: "0.75rem" }}>
                {" "}
                {/* Giảm kích thước chữ */}
                25 days ago
              </small>
              <Button variant="primary" className="mt-3">
                View jobs
              </Button>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Snapshot;
