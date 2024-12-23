import { Card, Button } from "react-bootstrap";

interface iJobDescription {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
  requirements: string[];
}

interface headerProps {
  job: iJobDescription;
}

const JobDetail = ({ job }: headerProps) => {
  return (
    <div style={{ overflow: "scroll", scrollbarWidth: "none", height: "60vh" }}>
      <Card className="my-4 mt-0 mb-20px">
        <Card.Body>
          <Card.Title style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            {job.title}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {job.location}
          </Card.Subtitle>
          <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
            {job.date} | Over {job.requirements.length} requirements
          </Card.Text>
          <Button
            variant="primary"
            style={{ marginBottom: "1rem", fontSize: "0.9rem" }}
          >
            Apply Now
          </Button>
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
