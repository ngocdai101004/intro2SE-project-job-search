import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../../common/axiosInstance";
import MyHeader from "../../../components/MyHeader";
import IUser from "../../../interfaces/user";
import {Card, Col, Container, FormControl, InputGroup, Row, Spinner,} from "react-bootstrap";
import AnimatedCard from "../../../components/AnimatedCard.tsx";

const UserList = () => {
    const [userList, setUserList] = useState<IUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userID, setUserID] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/user/user-list");
                setUserList(response.data.data.users);
                setFilteredUsers(response.data.data.users); // Initialize filtered list

                const userResponse = await axiosInstance.get("/user/profile");
                setUserID(userResponse.data.data.user._id);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredUsers(
            userList.filter((user) =>
                `${user.first_name} ${user.last_name}`.toLowerCase().includes(query)
            )
        );
    };

    return (
        <div>
            <MyHeader mydefaultActiveKey="/user"/>
            <Container className="container mt-4">
                <h3 className="mb-3">User List</h3>

                {/* Search Bar */}
                <InputGroup className="mb-4">
                    <FormControl
                        placeholder="Search for a user..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </InputGroup>

                {/* Loader */}
                {isLoading ? (
                    <div className="d-flex justify-content-center mt-5">
                        <Spinner animation="border"/>
                    </div>
                ) : !Array.isArray(filteredUsers) || filteredUsers.length === 0 ? (
                    <div className="text-center text-muted mt-5">
                        <p>No users found</p>
                    </div>
                ) : (
                    <Row>
                        {filteredUsers
                            .filter((user) => user._id !== userID)
                            .map((user) => (
                                <Col
                                    key={user._id}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    className="mb-4"
                                >
                                    <AnimatedCard
                                        onClick={() => navigate(`/user/${user._id}/profile`)}
                                        isSelected={false}
                                    >
                                        <Card.Img
                                            variant="top"
                                            src={user.avatar || "https://via.placeholder.com/150"}
                                            alt={`${user.first_name} ${user.last_name} avatar`}
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
                                                {user.first_name} {user.last_name}
                                            </Card.Title>
                                            <Card.Text
                                                className="text-muted"
                                                style={{fontSize: "14px"}}
                                            >
                                                {user.email || "Email not available"}
                                            </Card.Text>
                                            <Card.Text style={{fontSize: "13px", color: "#6c757d"}}>
                                                {user.short_bio || "No description available"}
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

export default UserList;
