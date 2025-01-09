import Snapshot from "../Body/SnapShot";
import CompanyHeader from "../Header/CompanyHeader";
import Jobs from "../Body/Jobs";
import Reviews from "../Body/Reviews";
import React from "react";
import ICompany from "../../../interfaces/company";

const QA = () => (
  <div className="content-section bg-lightyellow">Q&A Content</div>
);

interface Props {
  myActiveKey: string;
  setMyActiveKey: React.Dispatch<React.SetStateAction<string>>;
  companyData: ICompany | null;
}

function Company({ myActiveKey, setMyActiveKey, companyData }: Props) {
  const renderContent = () => {
    switch (myActiveKey) {
      case "/snapshot":
        return companyData ? <Snapshot companyData={companyData} /> : null;
      case "/jobs":
        return <Jobs company_id={companyData?._id || ""} />;
      case "/reviews":
        return <Reviews company_id={companyData?._id || ""} />;
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
      <CompanyHeader
        myState={myActiveKey}
        setMyState={setMyActiveKey}
        companyData={companyData}
      />
      <div className="flex-grow-1">{renderContent()}</div>
    </div>
  );
}

export default Company;
