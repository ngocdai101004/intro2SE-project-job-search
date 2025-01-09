import React, { useState } from "react";
import Company from "./Company";
// import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import CompanyForm from "../../BuildCompany/CompanyForm";
import ICompany from "../../../interfaces/company";

interface Props {
  myActiveKey: string;
  setMyActiveKey: React.Dispatch<React.SetStateAction<string>>;
  companyData: ICompany | null;
}

const OwnCompany: React.FC<Props> = ({
  myActiveKey,
  setMyActiveKey,
  companyData,
}) => {
  //   const navigate = useNavigate();
  const isOwnProfile = true;
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Company
        myActiveKey={myActiveKey}
        setMyActiveKey={setMyActiveKey}
        companyData={companyData}
      />
      {isOwnProfile && (
        <Button
          onClick={() => {
            setShowModal(true);
            setIsEditing(!isEditing);
          }}
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
          <BsPencilSquare size={20} />
        </Button>
      )}

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setIsEditing(false);
        }}
        centered
        size="xl"
        style={{ height: "83%", marginTop: "4%", overflowY: "hidden" }}
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#f8f9fa",
            position: "sticky",
            top: "0",
            zIndex: 1,
          }}
        >
          <Modal.Title>Edit Your Company Information</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "auto", height: "80vh" }}>
          <CompanyForm companyData={companyData} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OwnCompany;
