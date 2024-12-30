import React from "react";
import MyHeader from "../../../components/MyHeader";
import axiosInstance from "../../../common/axiosInstance";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import IUser from "../../../interfaces/user"
import UserHeader from "../UserHeader/UserHeader";
import IUserInfo from  "../../../interfaces/userinfo";
import UserMainProfile from "./MainUserProfile";
import { useNavigate } from 'react-router-dom';




const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [myActiveKey, setMyActiveKey] = React.useState("/snapshot");
  const { userID } = useParams<{ userID: string }>();
  const [user, setUser] = useState<IUser>({});
  const [userInfo, setUserInfo] = useState<IUserInfo>({});
  const [isOwnProfile, setIsOwnProfile] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response1;
        let response2;
        
        if (!userID) {
          response1 = await axiosInstance.get("/user/profile");
          response2 = await axiosInstance.get("/user/profile/info");
          setIsOwnProfile(true);

        }
        else {
          response1 = await axiosInstance.get("/user/" + userID + "/profile");
          response2 = await axiosInstance.get("/user/" + userID + "/profile/info");
        }
        setUser(response1.data.data.user);
        setUserInfo(response2.data.data.userInfo);
      } catch (error) {
        navigate("/signin");
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [userID, navigate]);

  console.log("User Data in UserProfile:", userInfo);

  useEffect(() => {
    
    if (myActiveKey === "/job-search-cv") {
    const currentPath = window.location.pathname.split("/snapshot")[0];
      navigate(currentPath + myActiveKey);
    }
  }, [myActiveKey, navigate, userID]);

  console.log("User Data in UserProfile:", userInfo.ready_to_work);
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
      <UserHeader  myState={myActiveKey} setMyState={setMyActiveKey} userData={
          {
            user: user,
            userInfo: userInfo
          }
        }/>
        <UserMainProfile  userData={
          {
            user: user,
            userInfo: userInfo,
          }
        }
        setUser = {setUser}
        setUserInfo = {setUserInfo}
        isOwnProfile={isOwnProfile}
        />;
    </div>
  );
}

export default UserProfile;