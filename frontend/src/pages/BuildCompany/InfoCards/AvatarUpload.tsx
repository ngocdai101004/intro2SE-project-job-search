import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ICompany from "../../../interfaces/company"; // Adjust the path as necessary

interface Props {
  data: ICompany; // Expecting data to have an avatar property
  onChange: (field: keyof ICompany, value: string) => void; // Function to handle changes
}

const AvatarUpload: React.FC<Props> = ({ data, onChange }) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      setLoading(true);
      try {
        // const url = await uploadFile(formData); // Assuming uploadFile is defined elsewhere
        const url =
          "https://jobsearch.nyc3.digitaloceanspaces.com/avatar/Screenshot%20(1).png"; // Assuming uploadFile is defined elsewhere
        onChange("avatar", url); // Update the avatar URL in the parent component
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h4>Upload Avatar</h4>
      <Form.Group controlId="formFile">
        <Form.Label>Choose an image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
        />
      </Form.Group>
      {loading && <p>Uploading...</p>}
      {data.avatar && (
        <div>
          <h5>Current Avatar:</h5>
          <img
            src={data.avatar}
            alt="Current Avatar"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
