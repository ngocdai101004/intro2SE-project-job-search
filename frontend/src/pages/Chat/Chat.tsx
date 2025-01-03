import {Button, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MyHeader from "../../components/MyHeader.tsx";
import {useEffect, useState} from "react";
import axiosInstance from "../../common/axiosInstance.tsx";

interface Message {
    sender_id: string;
    message: string;
    date: Date;
    username: string; // Include username here, assuming it's part of the response
}

interface ChatInfo {
    chatID: string;
    users: {
        userID: string;
        username: string;
    }[]; // Assuming it's an array of user IDs or user objects
    messages: Message[];
}

const ChatPage = () => {
    const [listChat, setListChat] = useState<ChatInfo[]>([]);
    const [sender_id, setSender_id] = useState<string>("");
    const [active, setActive] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/chat");
                setListChat(response.data.data);
                setSender_id(response.data.sender_id);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [count]);

    setTimeout(() => {
        setCount(count + 1);
    }, 1000);

    const handleChatClick = (index: number) => {
        setActive(index);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() === "") {
            console.log("Cannot send an empty message");
            return;
        }
        console.log("Message submitted:", message);
        try {
            await axiosInstance.post("/chat", {
                chatID: listChat[active].chatID,
                message: message,
            });
            setCount(count + 1);
            setMessage("");
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <MyHeader mydefaultActiveKey="chat"/>
            <Container fluid className="d-flex flex-column flex-grow-1" style={{backgroundColor: "#f5f5f5"}}>
                {/* Main Content */}
                <Row className="d-flex shadow-sm bg-white rounded m-4 border border-1 border-black rounded-4 shadow-lg">
                    {/* Left Sidebar */}

                    <Col
                        md={4}
                        className="border-end p-3 border-1 border-black"
                        style={{
                            overflowY: "auto",
                            maxHeight: "calc(100vh - 100px)", // Adjust to account for header/footer
                        }}
                    >
                        <h5 className="fw-bold mb-4">Messages</h5>
                        <ListGroup variant="flush">
                            {listChat.map((chat, index) => (
                                <ListGroup.Item
                                    key={index}
                                    className="d-flex justify-content-between align-items-center py-3 border border-1 rounded-4 mb-2 shadow-sm border-black"
                                    action
                                    active={index === active}
                                    onClick={() => handleChatClick(index)}
                                >
                                    <div className="d-flex w-100 align-items-center justify-content-around">
                                        <div
                                            className="rounded-circle bg-dark"
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                marginRight: "15px",
                                            }}
                                        ></div>
                                        <div className="w-75">
                                            <h6 className="m-0 fw-bold">{chat.users[0].userID === sender_id ? chat.users[1].username : chat.users[0].username}</h6> {/* Display user names */}
                                            <small>
                                                {chat.messages[chat.messages.length - 1]?.message.length < 25
                                                    ? chat.messages[chat.messages.length - 1]?.message
                                                    : `${chat.messages[chat.messages.length - 1]?.message.slice(0, 25)}...`}
                                            </small>
                                        </div>
                                    </div>
                                    <div>
                                        {index === active && (
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
                    </Col> {/* Right Chat Section */}
                    <Col
                        md={8}
                        className="p-3 d-flex flex-column "
                        style={{
                            maxHeight: "calc(100vh - 100px)", // Adjust for header/footer
                        }}
                    >
                        <h5 className="fw-bold mb-4 border-bottom border-black pb-3">Chat</h5>

                        {/* Chat Bubbles Section */}
                        <div
                            className="vh-100 rounded p-3 flex-grow-1 d-flex flex-column"
                            style={{
                                overflowY: "auto",
                            }}
                        >
                            {
                                listChat[active]?.messages.map((message, msgIndex) => (
                                    <div
                                        key={msgIndex}
                                        className={`d-flex ${message.sender_id !== sender_id ? "justify-content-start" : "justify-content-end"} mb-3`}
                                    >
                                        <div
                                            className={`py-1 px-2 rounded-4 ${message.sender_id !== sender_id ? "bg-secondary-subtle" : "bg-primary-subtle"}`}
                                            style={{
                                                maxWidth: "70%",
                                            }}
                                        >
                                            <small>{message.message}</small>
                                        </div>
                                    </div>
                                ))
                            }
                            {/*</div>*/}
                        </div>

                        {/* Input Field */}
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Form.Group controlId="messageInput" className="d-flex align-items-center">
                                <Form.Control
                                    type="text"
                                    placeholder="Type a message"
                                    className="rounded-pill me-2 border border-1 border-black" // Adds spacing between input and button
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)} // Update state on input change
                                />
                                <Button type="submit" variant="primary" className="rounded-pill">
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
