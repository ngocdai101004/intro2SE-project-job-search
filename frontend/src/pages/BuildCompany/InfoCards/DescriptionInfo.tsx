import { Form, Row } from "react-bootstrap";
import ICompany from "../../../interfaces/company";

interface Props {
  data: ICompany;
  onChange: (field: keyof ICompany, value: unknown) => void;
}

const DescriptionInfo: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div>
      <h4>Description Information</h4>

      <Row>
        <Form.Group className="mb-3" controlId="formCompanySize">
          <Form.Label>Company Size</Form.Label>
          <Form.Control
            type="text"
            placeholder={
              data.description?.company_size.join(", ") ||
              "Enter company sizes separated by commas"
            }
            onChange={(e) => {
              const sizes = e.target.value.split(",").map(Number);
              onChange("description", {
                ...data.description,
                company_size: sizes,
              });
            }}
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="mb-3" controlId="formIndustry">
          <Form.Label>Industry</Form.Label>
          <Form.Control
            type="text"
            placeholder={data.description?.industry || "Enter the industry"}
            onChange={(e) => {
              onChange("description", {
                ...data.description,
                industry: e.target.value,
              });
            }}
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="mb-3" controlId="formHeadquarters">
          <Form.Label>Headquarters</Form.Label>
          <Form.Control
            type="text"
            placeholder={
              data.description?.headquarters || "Enter headquarters location"
            }
            onChange={(e) => {
              onChange("description", {
                ...data.description,
                headquarters: e.target.value,
              });
            }}
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="mb-3" controlId="formFounded">
          <Form.Label>Founded</Form.Label>
          <Form.Control
            type="date"
            value={
              data.description?.founded
                ? data.description.founded.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => {
              const date = new Date(e.target.value);
              onChange("description", { ...data.description, founded: date });
            }}
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="mb-3" controlId="formSpecialities">
          <Form.Label>Specialities</Form.Label>
          <Form.Control
            type="text"
            placeholder={
              data.description?.specialities.join(", ") ||
              "Enter specialities separated by commas"
            }
            onChange={(e) => {
              const specs = e.target.value.split(",").map((s) => s.trim());
              onChange("description", {
                ...data.description,
                specialities: specs,
              });
            }}
          />
        </Form.Group>
      </Row>
    </div>
  );
};

export default DescriptionInfo;
