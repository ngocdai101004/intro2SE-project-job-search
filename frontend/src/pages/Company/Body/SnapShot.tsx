import { Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ICompany from "../../../interfaces/company";

const Snapshot: React.FC<{ companyData: ICompany }> = ({ companyData }) => {
  return (
    <div
      className="container mt-4"
      style={{ overflow: "scroll", scrollbarWidth: "none", height: "60vh" }}
    >
      <Card className="p-4">
        <h4 className="mb-3" style={{ fontSize: "1.2rem" }}>
          About company
        </h4>
        <Row className="text-center mb-4 d-flex">
          <Col className="d-flex align-items-stretch">
            <div className="border rounded p-3 flex-fill">
              <p className="mb-1" style={{ fontSize: "0.9rem" }}>
                Company Size
              </p>
              <h5 style={{ fontSize: "1rem" }}>
                {companyData.description?.company_size} employees
              </h5>
            </div>
          </Col>
          <Col className="d-flex align-items-stretch">
            <div className="border rounded p-3 flex-fill">
              <p className="mb-1" style={{ fontSize: "0.9rem" }}>
                Industry
              </p>
              <h5 style={{ fontSize: "1rem" }}>
                {companyData.description?.industry}
              </h5>
            </div>
          </Col>
          <Col className="d-flex align-items-stretch">
            <div className="border rounded p-3 flex-fill">
              <p className="mb-1" style={{ fontSize: "0.9rem" }}>
                Headquarters
              </p>
              <h5 style={{ fontSize: "1rem" }}>
                {companyData.description?.headquarters}
              </h5>
            </div>
          </Col>
          <Col className="d-flex align-items-stretch">
            <div className="border rounded p-3 flex-fill">
              <p className="mb-1" style={{ fontSize: "0.9rem" }}>
                Website
              </p>
              <h5 style={{ fontSize: "1rem" }}>
                <a
                  href={companyData.description?.links?.[0]}
                  className="text-decoration-none"
                >
                  {companyData.description?.links?.[0]}
                </a>
              </h5>
            </div>
          </Col>
        </Row>
        <p style={{ fontSize: "0.85rem" }}>{companyData.short_description}</p>

        {/* <h4 className="mt-4 mb-3" style={{ fontSize: "1.2rem" }}>
          Job near you
        </h4> */}
        {/* <Row>
          <Col md={4} className="mb-3">
            <Card className="p-3 text-center">
              <h6 style={{ fontSize: "1rem" }}>
                Associate Machine Learning Engineer, Zalopay
              </h6>
              <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                Ho Chi Minh, Viet Nam
              </p>
              <small style={{ fontSize: "0.75rem" }}>25 days ago</small>
              <Button variant="primary" className="mt-3">
                View jobs
              </Button>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="p-3 text-center">
              <h6 style={{ fontSize: "1rem" }}>
                Software Development Intern, Zalopay
              </h6>
              <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                Ho Chi Minh, Viet Nam
              </p>
              <small style={{ fontSize: "0.75rem" }}>30 days ago</small>
              <Button variant="primary" className="mt-3">
                View jobs
              </Button>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="p-3 text-center">
              <h6 style={{ fontSize: "1rem" }}>
                Game Operations Collaborator (Fresher)
              </h6>
              <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                Ho Chi Minh, Viet Nam
              </p>
              <small style={{ fontSize: "0.75rem" }}>25 days ago</small>
              <Button variant="primary" className="mt-3">
                View jobs
              </Button>
            </Card>
          </Col>
        </Row> */}
      </Card>
    </div>
  );
};

export default Snapshot;
