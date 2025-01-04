import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ICompany from "../../../interfaces/company"; // Adjust the path as necessary
import { uploadFile } from "../../../utils/s3";
import IFile from "../../../interfaces/file";
import { Buffer as NodeBuffer } from "buffer";

interface Props {
  data: ICompany; // Expecting data to have an avatar property
  onChange: (field: keyof ICompany, value: string) => void; // Function to handle changes
}

const AvatarUpload: React.FC<Props> = ({ data, onChange }) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let url = "/company.png"; // Assuming uploadFile is defined elsewhere

    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as ArrayBuffer);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(selectedFile);
      });

      // Chuyển đổi ArrayBuffer thành Buffer
      const buffer = NodeBuffer.from(arrayBuffer);

      const file: IFile = {
        filename: selectedFile.name,
        buffer: buffer,
        mimetype: selectedFile.type,
      };

      setLoading(true);
      console.log("file");
      console.log(file);
      try {
        // console.log(file as any);
        url = await uploadFile("avatar", file); // Assuming uploadFile is defined elsewhere

        onChange("avatar", url); // Update the avatar URL in the parent component
        console.log("Avatar URL:", url);
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
