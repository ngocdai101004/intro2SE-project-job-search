import React from "react";
import MyHeader from "../../../components/MyHeader";
import { useEffect, createContext} from "react";
import { useState } from "react";
import UserHeader from "../UserHeader/UserHeader";
import JobSearchCVBody from "./JobSearchCVBody";
import { useNavigate } from 'react-router-dom';
import {BsPencilSquare} from "react-icons/bs";
import {Button} from "react-bootstrap";
export const EditingContext = createContext(false);


interface UserProfileProps {
  userID: string | null;
  isOwer: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ userID, isOwer}) => {
  const [myActiveKey, setMyActiveKey] = React.useState("/job-search-cv");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const isOwnProfile = isOwer || false;
  
  


  useEffect(() => {
    if (myActiveKey === "/snapshot") {
      const currentPath = window.location.pathname.split("/job-search-cv")[0];
      navigate(currentPath + myActiveKey);
    }
  }, [myActiveKey, navigate, userID]);


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
      <MyHeader mydefaultActiveKey="/user" />
      <EditingContext.Provider value={isEditing}>
      <UserHeader  myState={myActiveKey} setMyState={setMyActiveKey} userID={userID}/>
      <JobSearchCVBody 
        userID={userID} 
      />;
      </EditingContext.Provider>
      {isOwnProfile && (
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
}
export default UserProfile;