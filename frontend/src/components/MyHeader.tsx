import React from "react";
import { Nav } from "react-bootstrap";

interface MyHeaderProps {
  mydefaultActiveKey: string;
}

export default function MyHeader({ mydefaultActiveKey }: MyHeaderProps) {
  const [myActiveKey, setMyActiveKey] = React.useState(
    mydefaultActiveKey || "/home"
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div
        className="w-100 d-flex justify-content-between align-items-center px-3"
        style={{ padding: "0 0" }}
      >
        <div className="d-flex align-items-center ms-3">
          <a className="navbar-brand me-5" href="home">
            <span>
              <img src="\magnifier.png" alt="" style={{ height: 40 }} />
              <img src="\Job Search.png" alt="" style={{ height: 30 }} />
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
                href="/company"
                className="text-white"
              >
                Company
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <div className="d-flex align-items-center">
          <Nav variant="underline" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link eventKey="link-1" href="/signin" className="text-white">
                Employers / Post Job
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <span className="text-white mx-3">|</span>

          <Nav variant="underline" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link eventKey="link-1" href="/signin" className="text-white">
                <i className="bi bi-chat-left text-white fs-5 me-2"></i>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1" href="/signin" className="text-white">
                <i className="bi bi-bell text-white fs-5 me-2"></i>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1" href="/user/profile" className="text-white">
                <i className="bi bi-person text-white fs-5 me-2"></i>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </nav>
  );
}
