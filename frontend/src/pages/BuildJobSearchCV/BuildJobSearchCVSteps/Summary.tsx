// ResumeSteps/Summary.tsx
import React, { useState } from 'react';
import { Buffer as NodeBuffer } from 'buffer';
import { Form } from 'react-bootstrap';
import { uploadFile } from "../../../utils/s3";
import IFile from "../../../interfaces/file";



interface SummaryProps {
    summary: string;
    setSummary: (summary: string) => void;
    resume: string[];
    setResume: (resume: string[]) => void;
}

const Summary: React.FC<SummaryProps> = ({ summary, setSummary, resume, setResume }) => {
    const [loading, setLoading] = useState(false);


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        let url = "/resume.pdf";
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            setLoading(true);
            const newResume = [...resume];
            for (let i = 0; i < selectedFiles.length; i++) {
                const selectedFile = selectedFiles[i];
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

                try {
                    url = await uploadFile("resume", file);
                    newResume.push(url);
                } catch (error) {
                    console.error("Error uploading file:", error);
                }
            }
            setResume(newResume);
            setLoading(false);
        } 
    }
    return (
        <div className="bg-light p-4">
            <h4>Professional Summary</h4>
            <Form.Group className="mb-3">
                <Form.Label>Tell us about yourself</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Write a professional summary highlighting your key strengths and career objectives..."
                />
            </Form.Group>
            <h4>Uploaded Resumes</h4>
            <ul>
                {resume.map((file, index) => (
                    <li key={index}>
                        {file}
                        <button onClick={(event) => {
                            event.preventDefault();
                            const newResume = resume.filter((_, i) => i !== index);
                            setResume(newResume);
                        }} style={{ border: 'none', background: 'none', color: 'red', cursor: 'pointer' }}>
                            &#x2716;
                        </button>
                    </li>
                ))}
            </ul>
            {loading && <p>Uploading...</p>}
            <Form.Group className="mb-3">
                <Form.Label>Upload Resume</Form.Label>
                <Form.Control
                    type="file"
                    multiple
                    onChange={handleFileChange}
                />
            </Form.Group>
        </div>
    );
};

export default Summary;