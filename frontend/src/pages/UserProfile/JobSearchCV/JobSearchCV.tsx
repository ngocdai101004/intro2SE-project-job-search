import React from "react";
import MyHeader from "../../../components/MyHeader";
import axiosInstance from "../../../common/axiosInstance";
import { useEffect, createContext} from "react";
import { useState } from "react";
import IUser from "../../../interfaces/user"
import UserHeader from "../UserHeader/UserHeader";
import IUserInfo from  "../../../interfaces/userinfo";
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
  const [user, setUser] = useState<IUser>({});
  const [userInfo, setUserInfo] = useState<IUserInfo>({user_id: "", ready_to_work: false});
  const [isOwnProfile, setIsOwnProfile] = useState<boolean>(isOwer || false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response1;
        let response2;
        
        if (!userID && isEditing) {
          response1 = await axiosInstance.get("/user/profile");
          response2 = await axiosInstance.get("/user/profile/info");
          setIsOwnProfile(true);

        }
        else if (userID && !isEditing) {
          response1 = await axiosInstance.get("/user/" + userID + "/profile");
          response2 = await axiosInstance.get("/user/" + userID + "/profile/info");
        }
        else {
          return;
        }
        setUser(response1.data.data.user);
        setUserInfo(response2.data.data.userInfo);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [userID, isEditing]);

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
      <UserHeader  myState={myActiveKey} setMyState={setMyActiveKey} user={user}/>
      <JobSearchCVBody userData={
          {
            user: user,
            userInfo: userInfo
          }
        }
        isOwnProfile={isOwnProfile}
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