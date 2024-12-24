import React from "react";
import MyHeader from "../../components/MyHeader";
import Snapshot from "./Body/SnapSHot";
import CompanyHeader from "./Header/CompanyHeader";
import Jobs from "./Body/Jobs";
import Reviews from "./Body/Reviews";

const QA = () => (
  <div className="content-section bg-lightyellow">Q&A Content</div>
);

function Company() {
  const [myActiveKey, setMyActiveKey] = React.useState("/snapshot");

  const renderContent = () => {
    switch (myActiveKey) {
      case "/snapshot":
        return <Snapshot />;
      case "/jobs":
        return <Jobs />;
      case "/reviews":
        return <Reviews />;
      case "/qa":
        return <QA />;
      default:
        return <Snapshot />;
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
      <CompanyHeader myState={myActiveKey} setMyState={setMyActiveKey} />
      <div className="">{renderContent()}</div>
    </div>
  );
}

export default Company;
