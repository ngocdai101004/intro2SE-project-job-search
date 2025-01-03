import {useParams} from "react-router-dom";
import JobSearchCV from "./JobSearchCV.tsx";
// import { useParams } from "react-router-dom";


const GuestJobSearchCV = () => {
    const {userID} = useParams<{ userID: string }>();
    if (!userID) {
        return (
            <h1>Invalid User ID</h1>
        );
    }
    return (
        <JobSearchCV userID={userID} isOwer={false}/>
    )
}

export default GuestJobSearchCV;