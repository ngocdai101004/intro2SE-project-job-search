import React, {useEffect} from "react";
import {Nav} from "react-bootstrap";
import axiosInstance from "../common/axiosInstance.tsx";
import {useNavigate} from "react-router-dom";


interface MyHeaderProps {
    mydefaultActiveKey: string;
    className?: string;
}

export default function MyHeader({mydefaultActiveKey, className}: MyHeaderProps) {
    const [myActiveKey, setMyActiveKey] = React.useState(
        mydefaultActiveKey || "/home"
    );

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [userData] = React.useState({name: '', email: ''});


    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/auth/check');
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    const response2 = await axiosInstance.get('/user/profile');
                    userData.email = response2.data.data.user.email;
                    userData.name = response2.data.data.user.first_name + " " + response2.data.data.user.last_name;
                }
            } catch (error: unknown) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [userData]);


    const [activeIcon, setActiveIcon] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const handleIconClick = (icon: string) => {
        setActiveIcon(icon);
        const dropdown = document.getElementById("userDropdown");
        if (dropdown) {
            dropdown.classList.toggle("show");
        }
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-dark bg-primary shadow-sm ${className}`}>
            <div
                className="w-100 d-flex justify-content-between align-items-center px-3"
                style={{padding: "0 0"}}
            >
                <div className="d-flex align-items-center ms-3">
                    <a className="navbar-brand me-5" href="/home">
            <span>
              <img src="\magnifier.png" alt="" style={{height: 40}}/>
              <img src="\Job Search.png" alt="" style={{height: 30}}/>
            </span>
                    </a>

                    <Nav
                        variant="underline"
                        activeKey={myActiveKey}
                        onSelect={(selectedKey) => setMyActiveKey(selectedKey || "/home")}
                    >
                        <Nav.Item>
                            <Nav.Link eventKey="/home" href="/home" className="text-white">
                                Home
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="/company"
                                href="/company-list"
                                className="text-white"
                            >
                                Company
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>

                <div className="d-flex align-items-center">
                    <Nav variant="underline" defaultActiveKey="/home" className="text-white">
                        <Nav.Item>
                            <Nav.Link eventKey="link-1" href="/signin" className="text-white">
                                Employers / Post Job
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <span className="text-white mx-3">|</span>

                    <Nav variant="underline" defaultActiveKey="/home" className="text-white">
                        <Nav.Item>
                            <Nav.Link
                                eventKey="link-1"
                                href="/chat"
                                className="text-white"
                            >
                                <i className="bi bi-chat-left text-white fs-5 me-2"></i>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav variant="underline" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link
                                eventKey="link-1"
                                href="/signin"
                                className="text-white"
                            >
                                <i className="bi bi-bell text-white fs-5 me-2"></i>
                            </Nav.Link>
                        </Nav.Item>

                    </Nav>
                    <Nav variant="underline" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link
                                eventKey="link-1"
                                href="#"
                                className={`text-white ${activeIcon === "person" ? "active" : ""}`}
                                onClick={() => handleIconClick("person")}
                            >
                                <i className="bi bi-person text-white fs-5 me-2"></i>
                            </Nav.Link>
                            <div id="userDropdown" className="dropdown-menu dropdown-menu-end"
                                 style={{right: 10, left: 'auto'}}>
                                {isAuthenticated ? (
                                    <>
                                        <span className="dropdown-item-text fw-bold fs-5">{userData.name}</span>
                                        <span className="dropdown-item-text">{userData.email}</span>
                                        <a className="dropdown-item" href="/user/profile"
                                           onClick={(e) => e.currentTarget.classList.add('active')}>
                                            <i className="bi bi-person-circle me-2"></i> Profile
                                        </a>
                                        <a
                                            className="dropdown-item text-center fw-bold text-navy bg-white border-0 mt-2 rounded"
                                            href="#"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                try {
                                                    await axiosInstance.get('/auth/logout');
                                                    navigate('/signin');
                                                } catch (error: unknown) {
                                                    console.log(error);
                                                }
                                            }}
                                        >
                                            Logout
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <a className="dropdown-item" href="/signin"
                                           onClick={(e) => e.currentTarget.classList.add('active')}>
                                            Sign in
                                        </a>
                                        <a className="dropdown-item" href="/signup"
                                           onClick={(e) => e.currentTarget.classList.add('active')}>
                                            Sign up
                                        </a>
                                    </>
                                )}
                            </div>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
        </nav>
    );
}
