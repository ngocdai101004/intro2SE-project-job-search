import {Button, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MyHeader from "../../components/MyHeader.tsx";

const ChatPage = () => {
    return (
        <>
            <MyHeader mydefaultActiveKey="chat"/>
            <Container fluid className="d-flex flex-column" style={{backgroundColor: "#f5f5f5"}}>
                {/* Main Content */}
                <Row className="d-flex shadow-sm bg-white rounded m-4">
                    {/* Left Sidebar */}
                    <Col
                        md={4}
                        className="border-end p-3"
                        style={{
                            overflowY: "auto",
                            maxHeight: "calc(100vh - 100px)", // Adjust to account for header/footer
                        }}
                    >
                        <h5 className="fw-bold mb-4">Message</h5>
                        <ListGroup variant="flush">
                            {[
                                "HTT",
                                "TND",
                                "SDGP",
                                "VAT",
                                "LXV",
                                "PMT",
                                "PDH",
                                "TNAK",
                                "HTT",
                                "TND",
                                "SDGP",
                                "VAT",
                                "LXV",
                                "PMT",
                                "PDH",
                                "TNAK",
                                "HTT",
                                "TND",
                                "SDGP",
                                "VAT",
                                "LXV",
                                "PMT",
                                "PDH",
                                "TNAK",
                                "HTT",
                                "TND",
                                "SDGP",
                                "VAT",
                                "LXV",
                                "PMT",
                                "PDH",
                                "TNAK",
                                "HTT",
                                "TND",
                                "SDGP",
                                "VAT",
                                "LXV",
                                "PMT",
                                "PDH",
                                "TNAK",
                            ].map((user, index) => (
                                <ListGroup.Item
                                    key={index}
                                    className="d-flex justify-content-between align-items-center py-3"
                                    action
                                    active={index === 0}
                                >
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="rounded-circle bg-dark"
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                marginRight: "15px",
                                            }}
                                        ></div>
                                        <div>
                                            <h6 className="m-0 fw-bold">{user}</h6>
                                            <small>Thank for your application</small>
                                        </div>
                                    </div>
                                    <div>
                                        {index % 2 === 0 && (
                                            <div
                                                className="rounded-circle bg-success"
                                                style={{
                                                    width: "10px",
                                                    height: "10px",
                                                }}
                                            ></div>
                                        )}
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>

                    {/* Right Chat Section */}
                    <Col
                        md={8}
                        className="p-3 d-flex flex-column"
                        style={{
                            maxHeight: "calc(100vh - 100px)", // Adjust for header/footer
                        }}
                    >
                        <h5 className="fw-bold mb-4">HTT</h5>

                        {/* Chat Bubbles Section */}
                        <div
                            className="border rounded p-3 flex-grow-1 d-flex flex-column"
                            style={{
                                overflowY: "auto",
                                backgroundColor: "#ffffff",
                            }}
                        >
                            {[
                                "At vero eos et accusamus et iusto odio dignissimos ducimus qui",
                                "At vero eos et accusamus",
                                "Accusamus et iusto odio dignissimos dsv",
                                "Thank for your application",
                                "At vero eos et accusamus et iusto odio dignissimos ducimus qui",
                                "At vero eos et accusamus",
                                "Accusamus et iusto odio dignissimos dsv",
                                "Thank for your application",
                                "At vero eos et accusamus et iusto odio dignissimos ducimus qui",
                                "At vero eos et accusamus",
                                "Accusamus et iusto odio dignissimos dsv",
                                "Thank for your application",
                                "At vero eos et accusamus et iusto odio dignissimos ducimus qui",
                                "At vero eos et accusamus",
                                "Accusamus et iusto odio dignissimos dsv",
                                "Thank for your application",
                                "At vero eos et accusamus et iusto odio dignissimos ducimus qui",
                                "At vero eos et accusamus",
                                "Accusamus et iusto odio dignissimos dsv",
                                "Thank for your application",
                                "At vero eos et accusamus et iusto odio dignissimos ducimus qui",
                                "At vero eos et accusamus",
                                "Accusamus et iusto odio dignissimos dsv",
                                "Thank for your application",
                            ].map((message, index) => (
                                <div
                                    key={index}
                                    className={`d-flex ${
                                        index % 2 === 0
                                            ? "justify-content-start"
                                            : "justify-content-end"
                                    } mb-3`}
                                >
                                    <div
                                        className="p-2 rounded"
                                        style={{
                                            backgroundColor: "#e0e0e0",
                                            maxWidth: "70%",
                                        }}
                                    >
                                        <small>{message}</small>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Field */}
                        <Form className="mt-3">
                            <Form.Group controlId="messageInput" className="d-flex align-items-center">
                                <Form.Control
                                    type="text"
                                    placeholder="Type a message"
                                    className="rounded-pill me-2" // Adds spacing between input and button
                                />
                                <Button variant="primary" className="rounded-pill">
                                    Send
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ChatPage;
