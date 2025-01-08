import { Form, Row } from "react-bootstrap";
import ICompany from "../../../interfaces/company";

interface Props {
  data: ICompany;
  onChange: (field: keyof ICompany, value: unknown) => void;
}

const PersonalInfo: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div>
      <h4>Company information</h4>
      <Row>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Company name</Form.Label>
          <Form.Control
            type="email"
            placeholder={data.company_name || "Enter company name"}
            onChange={(e) => {
              onChange("company_name", e.target.value);
            }}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Short description</Form.Label>
          <Form.Control
            type="email"
            placeholder={data.short_description || "Enter short description"}
            onChange={(e) => {
              onChange("short_description", e.target.value);
            }}
          />
        </Form.Group>
      </Row>
    </div>
  );
};

export default PersonalInfo;
