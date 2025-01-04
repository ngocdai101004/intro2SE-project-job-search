// components/AvatarUpload.tsx
import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

interface Props {
    avatar?: string;
    onAvatarChange: (value: string) => void;
}

const AvatarUpload: React.FC<Props> = ({ avatar, onAvatarChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleRemoveAvatar = () => {
        onAvatarChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div>
            <h4>Avatar</h4>
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