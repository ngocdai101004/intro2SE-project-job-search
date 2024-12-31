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
  const [myActiveKey, setMyActiveKey] = React.useState("/snapshot");
  const { userID } = useParams<{ userID: string }>();

  const [user, setUser] = useState<IUser>({});
  const [userInfo, setUserInfo] = useState<IUserInfo>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response1;
        let response2;
        if (!userID) {
          response1 = await axiosInstance.get("/user/profile");
          response2 = await axiosInstance.get("/user/profile/info");
        }
        else {
          console.log("User ID:", "/user/" + userID + "/profile");
          response1 = await axiosInstance.get("/user/" + userID + "/profile");
          response2 = await axiosInstance.get("/user/" + userID + "/profile/info");
        }
        setUser(response1.data.data.user);
        setUserInfo(response2.data.data.userInfo);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [userID]);
  console.log("User data State:", user);
  console.log("User Info State:", userInfo);

  const navigate = useNavigate();

  useEffect(() => {
    if (myActiveKey === "/job-search-cv") {
      navigate("/user/" + userID + "/profile/job-search-cv");
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
      <UserHeader  myState={myActiveKey} setMyState={setMyActiveKey} userData={
          {
            user: user,
            userInfo: userInfo
          }
        }/>
        <UserMainProfile  userData={
          {
            user: user,
            userInfo: userInfo
          }
        }/>;
    </div>
  );
}

export default UserProfile;