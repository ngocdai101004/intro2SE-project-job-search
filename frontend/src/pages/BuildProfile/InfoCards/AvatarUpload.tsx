// components/AvatarUpload.tsx
import React from 'react';
import { Form } from 'react-bootstrap';

interface Props {
    avatar?: string;
    onAvatarChange: (value: string) => void;
}

const AvatarUpload: React.FC<Props> = ({ avatar, onAvatarChange }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onAvatarChange(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <h4>Avatar</h4>
            {avatar && (
                <div className="mb-3">
                    <img
                        src={avatar}
                        alt="Avatar preview"
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        className="rounded"
                    />
                </div>
            )}
            <Form.Group className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </Form.Group>
        </div>
    );
};

export default AvatarUpload;