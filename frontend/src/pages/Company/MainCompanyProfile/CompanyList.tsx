import {useEffect, useState} from "react";
import ICompany from "../../../interfaces/company";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../../common/axiosInstance";
import MyHeader from "../../../components/MyHeader";
import {Card, Col, Container, FormControl, InputGroup, Row, Spinner,} from "react-bootstrap";
import AnimatedCard from "../../../components/AnimatedCard.tsx";

const CompanyList = () => {
    const [companyList, setCompanyList] = useState<ICompany[]>([]);
    const [filteredCompanies, setFilteredCompanies] = useState<ICompany[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/company");
                setCompanyList(response.data.data);
                setFilteredCompanies(response.data.data); // Initialize filtered list
            } catch (error) {
                console.error("Error fetching company data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredCompanies(
            companyList.filter((company) =>
                company.company_name?.toLowerCase().includes(query)
            )
        );
    };

    return (
        <div>
            <MyHeader mydefaultActiveKey="/company"/>
            <Container className="container mt-4">
                <h3 className="mb-3">Company List</h3>

                {/* Search Bar */}
                <InputGroup className="mb-4">
                    <FormControl
                        placeholder="Search for a company..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </InputGroup>

                {/* Loader */}
                {isLoading ? (
                    <div className="d-flex justify-content-center mt-5">
                        <Spinner animation="border"/>
                    </div>
                ) : filteredCompanies.length === 0 ? (
                    <div className="text-center text-muted mt-5">
                        <p>No companies found</p>
                    </div>
                ) : (
                    <Row>
                        {filteredCompanies.map((company) => (
                            <Col
                                key={company._id}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                className="mb-4"
                            >
                                <AnimatedCard
                                    onClick={() => navigate(`/company/${company._id}/snapshot`)}
                                    isSelected={false}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={company.avatar || "https://via.placeholder.com/150"}
                                        alt={`${company.company_name} avatar`}
                                        style={{
                                            height: "150px",
                                            objectFit: "cover",
                                            borderRadius: "10px 10px 0 0",
                                        }}
                                    />
                                    <Card.Body>
                                        <Card.Title
                                            style={{fontSize: "16px", fontWeight: "bold"}}
                                        >
                                            {company.company_name}
                                        </Card.Title>
                                        <Card.Text
                                            className="text-muted"
                                            style={{fontSize: "14px"}}
                                        >
                                            {company.address?.country || "Address not available"}
                                        </Card.Text>
                                        <Card.Text style={{fontSize: "13px", color: "#6c757d"}}>
                                            {company.short_description || "No description available"}
                                        </Card.Text>
                                        <Card.Text style={{fontSize: "13px", color: "#6c757d"}}>
                                            {"Employees: " + company.employees?.length ||
                                                "No description available"}
                                        </Card.Text>
                                        <Card.Text style={{fontSize: "13px", color: "#6c757d"}}>
                                            {"Followers: " + company.followers?.length ||
                                                "No description available"}
                                        </Card.Text>
                                    </Card.Body>
                                </AnimatedCard>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default CompanyList;
