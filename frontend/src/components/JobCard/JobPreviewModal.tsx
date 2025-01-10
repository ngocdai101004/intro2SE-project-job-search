import {useEffect, useState} from "react";
import {Button, Modal, Spinner} from "react-bootstrap";
import {IJob} from "../../interfaces/job.ts";
import axiosInstance from "../../common/axiosInstance.tsx";


const JobPreviewModal = ({jobId, show, handleClose}: { jobId: string, show: boolean, handleClose: () => void }) => {
    const [job, setJob] = useState<IJob | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchJob = async () => {
            if (jobId) {
                setLoading(true);
                try {
                    const res = await axiosInstance.get(`/job/${jobId}`);
                    setJob(res.data.data.job);
                    console.log(res.data.data.job);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchJob().finally(() => setLoading(false));
    }, [jobId]);

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{job ? job.title : "Loading..."}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary"/>
                        <p>Loading job details...</p>
                    </div>
                ) : job ? (
                    <>
                        <h5>Description</h5>
                        <p>{job.description}</p>

                        <h5>Job type</h5>
                        <p>{job.type}</p>

                        <h5>Location type</h5>
                        <p>{job.location_type}</p>

                        <h5>Responsibilities</h5>
                        <ul>
                            {job.responsibilities && job.responsibilities.map((resp, index) => (
                                <li key={index}>{resp}</li>
                            ))}
                        </ul>

                        <h5>Requirements</h5>
                        <ul>
                            {job.requirements && job.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>

                        <h5>Benefits</h5>
                        <ul>
                            {job.benefits && job.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                            ))}
                        </ul>

                        <h5>Salary</h5>
                        <p>${job.salary.min} - ${job.salary.max} per month</p>

                        <h5>Deadline</h5>
                        <p>{job.deadline?.toString()}</p>
                    </>
                ) : (
                    <p>Failed to load job details.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default JobPreviewModal;
