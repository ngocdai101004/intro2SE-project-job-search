import { useState } from "react";
import { Nav } from "react-bootstrap";
import { FaBriefcase, FaUser, FaPlus } from "react-icons/fa"; // Import icon
import "./SideBar.css";

const SideBar = () => {
  // State để xác định mục nào đang active
  const [activeItem, setActiveItem] = useState("create");

  return (
    <div className="sidebar d-flex flex-column">
      {/* Nút Create New */}
      <Nav.Link
        href="#create"
        className={`menu-item ${activeItem === "create" ? "active" : ""}`}
        onClick={() => setActiveItem("create")}
      >
        <FaPlus className="me-2" /> Create new
        <span className="ms-auto">›</span>
      </Nav.Link>

      {/* Menu Items */}
      <Nav.Link
        href="#jobs"
        className={`menu-item ${activeItem === "jobs" ? "active" : ""}`}
        onClick={() => setActiveItem("jobs")}
      >
        <FaBriefcase className="me-2" /> Jobs <span className="ms-auto">›</span>
      </Nav.Link>

      <Nav.Link
        href="#candidates"
        className={`menu-item ${activeItem === "candidates" ? "active" : ""}`}
        onClick={() => setActiveItem("candidates")}
      >
        <FaUser className="me-2" /> Candidates <span className="ms-auto"></span>
      </Nav.Link>
    </div>
  );
};

export default SideBar;
