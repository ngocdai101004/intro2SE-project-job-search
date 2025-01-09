import React, { useEffect, useState } from "react";
import Company from "./Company";
// import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import CompanyForm from "../../BuildCompany/CompanyForm";
import ICompany from "../../../interfaces/company";

interface Props {
  myActiveKey: string;
  setMyActiveKey: React.Dispatch<React.SetStateAction<string>>;
  myCompanyData: ICompany;
  isOwnProfile: boolean;
}

const OwnCompany: React.FC<Props> = ({
  myActiveKey,
  setMyActiveKey,
  myCompanyData,
  isOwnProfile,
}) => {
  //   const navigate = useNavigate();
  const [companyData, setCompanyData] = useState<ICompany>(myCompanyData);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCompanyData(myCompanyData);
  }, [myCompanyData]);

  return (
    <div>
      <Company
        myActiveKey={myActiveKey}
        setMyActiveKey={setMyActiveKey}
        companyData={myCompanyData}
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
          <CompanyForm
            companyData={companyData}
            setCompanyData={setCompanyData}
            isCreating={false}
            _id={companyData._id}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OwnCompany;
