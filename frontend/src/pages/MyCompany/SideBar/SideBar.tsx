import React, { useState } from "react";
import "./SideBar.css"; // Thêm CSS để xử lý giao diện
import { FaArrowRight } from "react-icons/fa";

interface SidebarItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  showIcon?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  isActive,
  onClick,
  showIcon,
}) => {
  return (
    <div
      className={`sidebar-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <span>{label}</span>
      {showIcon && <FaArrowRight className="icon" />}
    </div>
  );
};

const SideBar: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Jobs");

  const menuItems = [
    { label: "Create New", showIcon: true },
    { label: "Jobs", showIcon: true },
    { label: "Candidates", showIcon: false },
  ];

  return (
    <div className="sidebar">
      {menuItems.map((item) => (
        <SidebarItem
          key={item.label}
          label={item.label}
          isActive={activeItem === item.label}
          onClick={() => setActiveItem(item.label)}
          showIcon={item.showIcon}
        />
      ))}
    </div>
  );
};

export default SideBar;
