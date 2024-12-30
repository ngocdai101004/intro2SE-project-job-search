import React from "react";
import MyHeader from "../../components/MyHeader";
import Snapshot from "./Body/SnapShot";
import CompanyHeader from "./Header/CompanyHeader";
import Jobs from "./Body/Jobs";
import Reviews from "./Body/Reviews";
import axiosInstance from "../../common/axiosInstance";
import { useEffect } from "react";
import { useState } from "react";
import ICompany from "../../interfaces/company"

const QA = () => (
  <div className="content-section bg-lightyellow">Q&A Content</div>
);

function Company() {
  const [myActiveKey, setMyActiveKey] = React.useState("/snapshot");
  const companyID = "676a2f93fc0132097a2a71ea";

  const [companyData, setCompanyData] = useState<ICompany>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/company/" + companyID);
        setCompanyData(response.data.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchData();
  }, []);
  console.log("myActiveKey:", myActiveKey);
  const renderContent = () => {
    switch (myActiveKey) {
      case "/snapshot":
        return <Snapshot companyData={companyData} />;
      case "/jobs":
        return <Jobs />;
      case "/reviews":
        return <Reviews />;
      case "/qa":
        return <QA />;
      default:
        return <Snapshot companyData={companyData} />;
    }
  };

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
      <MyHeader mydefaultActiveKey="/company" />
      <CompanyHeader myState={myActiveKey} setMyState={setMyActiveKey} companyData={companyData} />
      <div className="">{renderContent()}</div>
    </div>
  );
}

export default Company;