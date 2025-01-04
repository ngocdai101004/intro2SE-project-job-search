import { Form, Row } from "react-bootstrap";
import ICompany from "../../../interfaces/company";

interface Props {
  data: ICompany; // Expecting data to have an address property
  onChange: (field: keyof ICompany, value: unknown) => void; // Updated to accept unknown
}

const AddressInfo: React.FC<Props> = ({ data, onChange }) => {
  // Retrieve address from the data prop
  const address = data.address || {
    district: "",
    city_state: "",
    zip_code: "",
    country: "",
  };

  const handleFieldChange = (field: keyof typeof address, value: string) => {
    // Create updated address object
    const updatedAddress = { ...address, [field]: value };
    // Call onChange with the updated address
    onChange("address", updatedAddress);
  };

  return (
    <div>
      <h4>Address</h4>
      <Row>
        <Form.Group className="mb-3" controlId="formDistrict">
          <Form.Label>District</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter district"
            value={address.district}
            onChange={(e) => handleFieldChange("district", e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="mb-3" controlId="formCityState">
          <Form.Label>City/State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city/state"
            value={address.city_state}
            onChange={(e) => handleFieldChange("city_state", e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="mb-3" controlId="formZipCode">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter zip code"
            value={address.zip_code}
            onChange={(e) => handleFieldChange("zip_code", e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="mb-3" controlId="formCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={address.country}
            onChange={(e) => handleFieldChange("country", e.target.value)}
          />
        </Form.Group>
      </Row>
    </div>
  );
};

export default AddressInfo;
