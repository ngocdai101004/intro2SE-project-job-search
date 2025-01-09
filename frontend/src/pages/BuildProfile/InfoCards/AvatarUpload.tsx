// components/AvatarUpload.tsx
import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { uploadFile } from "../../../utils/s3";
import IFile from "../../../interfaces/file";
import { Buffer as NodeBuffer } from "buffer";

interface Props {
    avatar?: string;
    setAvatar: (value: string) => void;
}

const AvatarUpload: React.FC<Props> = ({ avatar, setAvatar }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        let url = "/company.png";
        if (selectedFile) {
            const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                  resolve(reader.result as ArrayBuffer);
                };
                reader.onerror = reject;
                reader.readAsArrayBuffer(selectedFile);
              });

            const buffer = NodeBuffer.from(arrayBuffer);

            const file: IFile = {
                filename: selectedFile.name,
                buffer: buffer,
                mimetype: selectedFile.type,
            };
            setLoading(true);
            console.log("file", file);
            try {
                url = await uploadFile("avatar", file);
                setAvatar(url);
                console.log("Avatar URL:", url);
            } catch (error) {
                console.error("Error uploading file:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleRemoveAvatar = () => {
        setAvatar('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div>
            <h4>Avatar</h4>
            {loading && <p>Uploading...</p>}
            {avatar && (
                <div style={{ position: 'relative' }}>
                    <div className="mb-3 text-center">
                        <div
                            style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                display: 'inline-block',
                                border: '1px solid #ddd'
                            }}
                        >
                            <img
                                src={avatar}
                                alt="Avatar preview"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <Button variant="danger" onClick={handleRemoveAvatar} className="mt-2" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                            Remove Image
                        </Button>
                    </div>
                </div>
            )}
            <Form.Group className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
            </Form.Group>
        </div>
    );
};

export default AvatarUpload;