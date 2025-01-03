// components/AddressInfo.tsx
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { IAddress } from '../../../interfaces/user';

interface Props {
    address?: IAddress;
    onChange: (address: Partial<IAddress>) => void;
}

const AddressInfo: React.FC<Props> = ({ address, onChange }) => {
    return (
        <div>
            <h4>Address</h4>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>District</Form.Label>
                        <Form.Control
                            type="text"
                            value={address?.district}
                            onChange={(e) => onChange({ district: e.target.value })}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>City/State</Form.Label>
                        <Form.Control
                            type="text"
                            value={address?.city_state}
                            onChange={(e) => onChange({ city_state: e.target.value })}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control
                            type="text"
                            value={address?.zip_code}
                            onChange={(e) => onChange({ zip_code: e.target.value })}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            value={address?.country}
                            onChange={(e) => onChange({ country: e.target.value })}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
};

export default AddressInfo;
