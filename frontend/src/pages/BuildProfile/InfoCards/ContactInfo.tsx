import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import style cho react-phone-input-2

interface Props {
    phone?: string;
    setPhone: (phone: string) => void;
}

const ContactInfo: React.FC<Props> = ({ phone, setPhone }) => {
    const [error, setError] = useState<string | null>(null);

    const handlePhoneChange = (value: string) => {
        const phoneRegex = /^\+[1-9]\d{1,14}$/; // ITU E.164 format validation

        if (!phoneRegex.test(value)) {
            setError('Invalid phone number format.');
        } else {
            setError(null);
        }

        setPhone(value);
    };

    return (
        <div>
            <h4>Phone Number</h4>
            <div className="mb-3">
                <PhoneInput
                    country={'us'} // Default country
                    value={phone}
                    onChange={handlePhoneChange}
                    inputClass={`form-control ${error ? 'is-invalid' : ''}`} // Thêm class cho Bootstrap
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

export default ContactInfo;
