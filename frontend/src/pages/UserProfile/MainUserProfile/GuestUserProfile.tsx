import {useParams} from "react-router-dom";
import UserProfile from "./UserProfile.tsx";
// import { useParams } from "react-router-dom";


const GuestUserProfile = () => {
    const {userID} = useParams<{ userID: string }>();
    if (!userID) {
        return (
            <h1>Invalid User ID</h1>
        );
    }
    return (
        <UserProfile userID={userID} isOwer={false}/>
    )
}

export default GuestUserProfile;