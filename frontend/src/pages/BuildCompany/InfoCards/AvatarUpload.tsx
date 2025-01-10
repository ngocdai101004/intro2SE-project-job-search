import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
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

  const handleRemoveAvatar = () => {
    onChange("avatar", ""); // Clear the avatar URL in the parent component
  };

  return (
    <div>
      <h4>Upload Avatar</h4>
      {(data.avatar ?? "") !== "" && (
        <div style={{ position: "relative" }}>
          <div className="mb-3 text-center">
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                overflow: "hidden",
                display: "inline-block",
                border: "1px solid #ddd",
              }}
            >
              <img
                src={data.avatar}
                alt="Avatar preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <Button
              variant="danger"
              onClick={handleRemoveAvatar}
              className="mt-2"
              style={{ position: "absolute", bottom: "10px", right: "10px" }}
            >
              Remove Image
            </Button>
          </div>
        </div>
      )}
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
    </div>
  );
};

export default AvatarUpload;
