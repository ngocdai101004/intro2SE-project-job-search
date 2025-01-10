import React, {useState} from "react";
import {IJobCard} from "../../interfaces/job";
import TimeFormat from "./TimeFormat";
import {Card} from "react-bootstrap";

interface JobListCardProps {
    job: IJobCard;
    isSelected: boolean;
    onClick: () => void;
}

const JobListCard: React.FC<JobListCardProps> = ({
                                                     job,
                                                     isSelected,
                                                     onClick,
                                                 }) => {
    const [color, setColor] = useState("transparent");
    return (
        <Card
            className={`card bg-${color} mb-4 shadow-sm ${isSelected ? "selected-bg" : ""}`}
            onClick={onClick}
            style={{
                cursor: "pointer",
                transition: "background-color 0.3s ease",
            }}
            onMouseEnter={() => setColor("secondary")}
            onMouseLeave={() => setColor("transparent")}
        >
            <div className="card-body">
                <h5 className="card-title font-weight-bold">{job.title}</h5>
                <div className="d-flex align-items-center mb-2">
                    <img
                        src={job.company_avatar}
                        alt={job.company_name}
                        className="rounded-circle"
                        style={{width: "20px", height: "20px", marginRight: "10px"}}
                    />
                    <span>{job.company_name}</span>
                </div>
                <div className="d-flex justify-content-start">
                    <p
                        className="card-text"
                        style={{
                            fontWeight: "bold",
                            marginRight: "20px",
                            fontSize: "14px",
                        }}
                    >
                        {job.type}
                    </p>
                    <p
                        className="card-text"
                        style={{
                            fontWeight: "bold",
                            marginRight: "20px",
                            fontSize: "14px",
                        }}
                    >
                        {job.location_type}
                    </p>
                    <p
                        className="card-text"
                        style={{fontWeight: "bold", fontSize: "14px"}}
                    >
                        {job.number_of_peoples} available positions
                    </p>
                </div>
                <div className="d-flex justify-content-end">
                    <p
                        className="card-text"
                        style={{
                            fontWeight: "lighter",
                            marginRight: "20px",
                            marginTop: "-20px",
                            fontSize: "14px",
                        }}
                    >
                        {job.open_time && <TimeFormat date={job.open_time}/>}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default JobListCard;
