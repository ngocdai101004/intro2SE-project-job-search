// components/AddressInfo.tsx
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { IAddress } from '../../../interfaces/user';

interface Props {
    address?: IAddress;
    setAddress: (address: IAddress) => void;
}

const AddressInfo: React.FC<Props> = ({ address, setAddress }) => {
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
                            onChange={(e) => setAddress({ ...address, district: e.target.value || '', zip_code: address?.zip_code || '', city_state: address?.city_state || '', country: address?.country || '' })}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>City/State</Form.Label>
                        <Form.Control
                            type="text"
                            value={address?.city_state}
                            onChange={(e) => setAddress({ ...address, city_state: e.target.value || '', district: address?.district || '', zip_code: address?.zip_code || '', country: address?.country || '' })}
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
                            onChange={(e) => setAddress({ ...address, zip_code: e.target.value || '', district: address?.district || '', city_state: address?.city_state || '', country: address?.country || '' })}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            value={address?.country}
                            onChange={(e) => setAddress({ ...address, country: e.target.value || '', district: address?.district || '', city_state: address?.city_state || '', zip_code: address?.zip_code || '' })}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
};

export default AddressInfo;
