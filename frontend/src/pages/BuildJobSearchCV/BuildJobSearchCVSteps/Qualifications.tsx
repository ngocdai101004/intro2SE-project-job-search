import React from 'react';
import { Form, Button} from 'react-bootstrap';
import { BuildJobSearhCVProps } from '../../../interfaces/userinfo';
import { IQualification } from '../../../interfaces/userinfo';


const Qualifications: React.FC<BuildJobSearhCVProps> = ({ data, setData }) => {
    const addQualification = () => {
        setData({
            ...data,
            qualifications: [...data.qualifications, {
                title: '',
                description: ''
            }]
        });
    };

    const removeQualification = (index: number) => {
        const newQualifications = data.qualifications.filter((_: IQualification, i: number) => i !== index);
        setData({ ...data, qualifications: newQualifications });
    };

    const updateQualification = (index: number, field: string, value: string) => {
        const newQualifications = [...data.qualifications];
        newQualifications[index] = { ...newQualifications[index], [field]: value };
        setData({ ...data, qualifications: newQualifications });
    };

    return (
        <div className="bg-light p-4">
            <h4 className="mb-4">Qualifications</h4>
            {data.qualifications.map((qual: IQualification, index: number) => (
                <div key={index} className="mb-4 p-3 border rounded position-relative">
                    <Button 
                        variant="link" 
                        className="position-absolute top-0 end-0 text-danger"
                        onClick={() => removeQualification(index)}
                    >
                        Remove
                    </Button>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={qual.title}
                            onChange={(e) => updateQualification(index, 'title', e.target.value)}
                            placeholder="e.g., Project Management Professional"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={qual.description}
                            onChange={(e) => updateQualification(index, 'description', e.target.value)}
                            placeholder="Describe your qualification..."
                        />
                    </Form.Group>
                </div>
            ))}
            <Button variant="outline-primary" onClick={addQualification}>
                Add Qualification
            </Button>
        </div>
    );
};

export default Qualifications;