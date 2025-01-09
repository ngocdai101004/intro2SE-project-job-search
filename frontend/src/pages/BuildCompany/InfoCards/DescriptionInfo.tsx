import { Form, Row, Button } from "react-bootstrap";
import { useState } from "react";
import ICompany from "../../../interfaces/company";

interface Props {
  data: ICompany;
  onChange: (field: keyof ICompany, value: unknown) => void;
}

const DescriptionInfo: React.FC<Props> = ({ data, onChange }) => {
  const [linkInput, setLinkInput] = useState<string>("");

  const handleAddLink = () => {
    if (linkInput) {
      const updatedLinks = [linkInput, ...(data.description?.links || [])];
      onChange("description", { ...data.description, links: updatedLinks });
      setLinkInput(""); // Clear the input after adding
    }
  };

  const handleDeleteLink = (linkToDelete: string) => {
    const updatedLinks = (data.description?.links || []).filter(
      (link) => link !== linkToDelete
    );
    onChange("description", { ...data.description, links: updatedLinks });
  };

  return (
    <div>
      <h4>Description</h4>

      <Row>
        <Form.Group className="mb-3" controlId="formCompanySize">
          <Form.Label>Company Size (From - To)</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="number"
              placeholder={
                (data.description?.company_size?.[0] ?? 0) === 0
                  ? "From"
                  : "" + data.description?.company_size?.[0]
              }
              onChange={(e) => {
                const from = Number(e.target.value);
                const to = data.description?.company_size?.[1] ?? 0;

                onChange("description", {
                  ...data.description,
                  company_size: [from, to],
                });
              }}
              className="me-2"
            />
            <Form.Control
              type="number"
              placeholder={
                (data.description?.company_size?.[1] ?? 0) === 0
                  ? "To"
                  : "" + data.description?.company_size?.[1]
              }
              onChange={(e) => {
                const to = Number(e.target.value);
                const from = data.description?.company_size?.[0] ?? 0;
                onChange("description", {
                  ...data.description,
                  company_size: [from, to],
                });
              }}
            />
          </div>
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
              data.description?.founded instanceof Date
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
              data.description?.specialities?.join(", ") ||
              "" ||
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

      <Row>
        <Form.Group className="mb-3" controlId="formLinks">
          <Form.Label>Links</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Enter a link"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              className="me-2"
            />
            <Button onClick={handleAddLink} variant="primary">
              Add
            </Button>
          </div>
          <ul>
            {data.description?.links?.map((link, index) => (
              <li
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                {link}
                <Button
                  className="m-2"
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteLink(link)}
                  style={{
                    backgroundColor: "white",
                    color: "red",
                    borderColor: "red",
                    transition: "background-color 0.3s, color 0.3s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "red";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "red";
                  }}
                >
                  x
                </Button>
              </li>
            ))}
          </ul>
        </Form.Group>
      </Row>
    </div>
  );
};

export default DescriptionInfo;
