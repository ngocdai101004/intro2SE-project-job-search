import {useParams} from "react-router-dom";
import UserProfile from "./UserProfile.tsx";

const GuestUserProfile = () => {
    const {userID} = useParams<{ userID: string }>();
    if (!userID) {
        return (
            <h1>Invalid User ID</h1>
        );
    }
    return (
        <UserProfile userID={userID}/>
    )
}

export default GuestUserProfile;