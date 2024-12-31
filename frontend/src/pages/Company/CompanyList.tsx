import { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import axiosInstance from "../../common/axiosInstance";
import MyHeader from "../../components/MyHeader";
import ICompany from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";

const CompanyList = () => {
  const [companyList, setCompanyList] = useState<ICompany[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/company");
        setCompanyList(response.data.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchData();
  }, []);
  console.log("Company data State:", companyList);

  return (
    <div>
      <MyHeader mydefaultActiveKey="/company" />
      <Container className="container mt-4">
        <h3 className="mb-3">Company List</h3>

        <ListGroup
          style={{ overflow: "scroll", scrollbarWidth: "none", height: "75vh" }}
        >
          {companyList.map((company) => (
            <ListGroup.Item
              key={company._id}
              action
              onClick={() => {
                navigate("/company/" + company._id + "/snapshot");
              }}
              style={{
                border: "1px solid lightgray",
                borderRadius: "8px",
                marginBottom: "0.5rem",
                backgroundColor: "#f8f9fa",
                cursor: "pointer",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                {company.company_name}
              </div>
              <div className="text-muted" style={{ fontSize: "13px" }}>
                {company.address?.country || "Address not available"}
              </div>
              <div className="text-muted" style={{ fontSize: "13px" }}>
                {company.admin_id}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default CompanyList;
