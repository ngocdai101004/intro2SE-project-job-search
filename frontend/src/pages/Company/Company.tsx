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

const QA = () => (
  <div className="content-section bg-lightyellow">Q&A Content</div>
);

const exampleCompany: ICompany = {
  _id: "123",
  company_name: "TechVibes Inc.",
  sumRating: 14,
  followers: ["user123", "user456", "user789"],
  address: {
    district: "District 1",
    city_state: "San Francisco, CA",
    zip_code: "94103",
    country: "USA",
  },
  description: {
    company_size: [50, 200],
    industry: "Information Technology",
    headquarters: "San Francisco, CA",
    links: ["https://techvibes.com", "https://linkedin.com/techvibes"],
    founded: new Date("2010-05-15"),
    specialities: ["Software Development", "Cloud Computing", "AI Solutions"],
  },
  short_description: "A leader in innovative tech solutions.",
  reviews: [
    {
      user_id: "user123",
      rating: 5,
      review: "Great place to work with a strong focus on innovation!",
      date: new Date("2023-12-15"),
    },
    {
      user_id: "user456",
      rating: 4,
      review: "Good opportunities for growth but high workload.",
      date: new Date("2023-11-25"),
    },
    {
      user_id: "user789",
      rating: 5,
      review: "Supportive management and collaborative environment.",
      date: new Date("2023-10-10"),
    },
  ],
  qa: [
    {
      question: "What is the company culture like?",
      answer:
        "Our culture fosters innovation, teamwork, and continuous learning.",
    },
    {
      question: "What benefits do you offer employees?",
      answer:
        "We provide health insurance, flexible work hours, and professional development programs.",
    },
    {
      question: "Is there room for career growth?",
      answer:
        "Yes, we encourage internal promotions and provide mentorship programs.",
    },
  ],
};

function Company() {
  const { company_id } = useParams<{ company_id: string }>(); // Lấy company_id từ URL
  const { active_key } = useParams<{ active_key: string }>(); // Lấy active_key từ URL

  const [myActiveKey, setMyActiveKey] = React.useState("/snapshot");

  const [companyData, setCompanyData] = useState<ICompany>(exampleCompany);
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
      <div className="">{renderContent()}</div>
    </div>
  );
}

export default Company;
