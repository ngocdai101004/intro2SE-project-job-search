import MyHeader from "../../../components/MyHeader";
import UserMainProfile from "./MainUserProfile";
import {createContext, useState} from "react";
import {Button} from "react-bootstrap";
import {BsPencilSquare} from "react-icons/bs";
import UserHeader from "../UserHeader/UserHeader.tsx"; // Importing an icon

export const EditingContext = createContext(false);

const UserProfile = ({userID}: { userID: string | null }) => {
    const [isEditing, setIsEditing] = useState(false);


    return (
        <div
            className="d-flex flex-column"
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <MyHeader mydefaultActiveKey="/user"/>
            <EditingContext.Provider value={isEditing}>
                <UserHeader userID={userID}/>
                <br/>
                <UserMainProfile userID={userID}/>
            </EditingContext.Provider>
            {/* Floating Action Button */}
            {!userID && (
                <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="position-fixed"
                    style={{
                        bottom: "1rem",
                        right: "1rem",
                        borderRadius: "50%",
                        width: "3rem",
                        height: "3rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                    variant="primary"
                >
                    <BsPencilSquare size={20}/>
                </Button>
            )}
        </div>
    );
};

export default UserProfile;
