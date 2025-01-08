import React from 'react';
import { Form, Button } from 'react-bootstrap';

interface SkillsProps {
    skills: string[];
    setSkills: (skills: string[]) => void;
}
const Skills: React.FC<SkillsProps> = ({ skills, setSkills }) => {
    const [newSkill, setNewSkill] = React.useState('');

    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter((skill: string) => skill !== skillToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    return (
        <div className="bg-light p-4">
            <h4 className="mb-4">Skills</h4>
            <Form.Group className="mb-4">
                <Form.Label>Add your skills</Form.Label>
                <div className="d-flex gap-2">
                    <Form.Control
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a skill and press Enter"
                    />
                    <Button variant="primary" onClick={addSkill}>
                        Add
                    </Button>
                </div>
            </Form.Group>
            <h5>Skills added</h5>
            <ul className="list-unstyled ">
                {skills.map((skill: string, index: number) => (
                    <li key={index} className="d-flex align-items-center mb-2 border p-2 rounded bg-white">
                        <span className="me-2">{skill}</span>
                        <Button
                            variant="link"
                            className="p-0 text-danger ms-auto"
                            onClick={() => removeSkill(skill)}
                        >
                            &times;
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Skills;
