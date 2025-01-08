import { Form, Row, Button } from "react-bootstrap";
import { useState } from "react";
import ICompany from "../../../interfaces/company";
import axiosInstance from "../../../common/axiosInstance";

interface Props {
  data: ICompany;
  onChange: (field: keyof ICompany, value: unknown) => void;
}

const AdminInfo: React.FC<Props> = ({ data, onChange }) => {
  const [adminInput, setAdminInput] = useState<string>("");

  const handleAddAdmin = async () => {
    if (adminInput) {
      try {
        const response = await axiosInstance.get(`/users?email=${adminInput}`);
        const data = await response.data;

        const updatedLinks = [data.data.user_id, ...(data.admin_id || [])];
        onChange("admin_id", updatedLinks);
        setAdminInput(""); // Clear the input after adding
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        alert(error.response.data?.message || "User not found");
      }
    }
  };

  const handleDeleteLink = (linkToDelete: string) => {
    const updatedLinks = (data.description?.links || []).filter(
      (link) => link !== linkToDelete
    );
    onChange("admin_id", updatedLinks);
  };

  return (
    <div>
      <h4>Admin list</h4>

      <Row>
        <Form.Group className="mb-3" controlId="formLinks">
          <Form.Label>Admin</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Enter an admin"
              value={adminInput}
              onChange={(e) => setAdminInput(e.target.value)}
              className="me-2"
            />
            <Button onClick={handleAddAdmin} variant="primary">
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

export default AdminInfo;
