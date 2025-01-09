import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Thêm import useParams
import MyHeader from "../../../components/MyHeader";
import axiosInstance from "../../../common/axiosInstance";
import { MyToastContainer } from "../../../components/MyToastContainer";
import OwnCompany from "./OwnCompany";
import ICompany from "../../../interfaces/company";

function MainCompany() {
  const { company_id } = useParams<{ company_id: string }>(); // Lấy company_id từ URL
  const { active_key } = useParams<{ active_key: string }>(); // Lấy active_key từ URL

  const [myActiveKey, setMyActiveKey] = React.useState("/snapshot");

  const [companyData, setCompanyData] = useState<ICompany | null>(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/company/${company_id}`); // Sử dụng company_id từ URL
      setCompanyData(response.data.data.company);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  useEffect(() => {
    if (company_id) {
      fetchData(); // Gọi fetchData chỉ khi có company_id
    }
    if (active_key) {
      setMyActiveKey("/" + active_key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Chạy lại khi company_id thay đổi

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
      <OwnCompany
        myActiveKey={myActiveKey}
        setMyActiveKey={setMyActiveKey}
        companyData={companyData}
      />
      {/* <CompanyHeader
        myState={myActiveKey}
        setMyState={setMyActiveKey}
        companyData={companyData}
      />
      <div className="flex-grow-1">{renderContent()}</div> */}
      <MyToastContainer />
    </div>
  );
}

export default MainCompany;
