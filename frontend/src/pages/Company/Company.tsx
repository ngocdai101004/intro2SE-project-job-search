import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Thêm import useParams
import MyHeader from "../../components/MyHeader";
import Snapshot from "./Body/SnapShot";
import CompanyHeader from "./Header/CompanyHeader";
import Jobs from "./Body/Jobs";
import Reviews from "./Body/Reviews";
import axiosInstance from "../../common/axiosInstance";
import ICompany from "../../interfaces/interfaces";
import { Spinner, Alert } from "react-bootstrap";
import { MyToastContainer } from "../../components/MyToastContainer";

const QA = () => (
  <div className="content-section bg-lightyellow">Q&A Content</div>
);

function Company() {
  const { company_id } = useParams<{ company_id: string }>(); // Lấy company_id từ URL
  const { active_key } = useParams<{ active_key: string }>(); // Lấy active_key từ URL

  const [myActiveKey, setMyActiveKey] = React.useState("/snapshot");

  const [companyData, setCompanyData] = useState<ICompany | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axiosInstance.get(`/company/${company_id}`); // Sử dụng company_id từ URL
      setCompanyData(response.data.data.company);
    } catch (error) {
      console.error("Error fetching company data:", error);
      setError("Failed to fetch company data. Please try again later.");
    } finally {
      setLoading(false);
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

  const renderContent = () => {
    if (loading) {
      return <Spinner animation="border" />;
    }

    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }

    switch (myActiveKey) {
      case "/snapshot":
        return companyData ? <Snapshot companyData={companyData} /> : null;
      case "/jobs":
        return <Jobs company_id={company_id || ""} />;
      case "/reviews":
        return <Reviews company_id={company_id || ""} />;
      case "/qa":
        return <QA />;
      default:
        return companyData ? <Snapshot companyData={companyData} /> : null;
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
      <CompanyHeader
        myState={myActiveKey}
        setMyState={setMyActiveKey}
        companyData={companyData}
      />
      <div className="flex-grow-1">{renderContent()}</div>
      <MyToastContainer />
    </div>
  );
}

export default Company;
