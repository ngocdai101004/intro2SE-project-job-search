import React, { useState, useEffect } from "react";
import "./SideBar.css"; // Thêm CSS để xử lý giao diện
import { FaChevronRight, FaPlus, FaBriefcase, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  showIcon?: boolean;
  icon: React.ReactNode;
  link: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  isActive,
  onClick,
  showIcon,
  icon,
}) => {
  return (
    <div
      className={`sidebar-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="sidebar-item-content">
        <div className="icon-left">{icon}</div>
        <span style={{ fontWeight: "500" }}>{label}</span>
      </div>
      {showIcon && <FaChevronRight className="icon-right" />}
    </div>
  );
};

const SideBar: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Jobs");
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Create New",
      showIcon: true,
      icon: <FaPlus />,
      link: "/my-company/create-job-post",
    },
    {
      label: "Jobs",
      showIcon: true,
      icon: <FaBriefcase />,
      link: "/my-company/job-list",
    },
    {
      label: "Candidates",
      showIcon: false,
      icon: <FaUser />,
      link: "/my-company/create-job-post",
    },
  ];

  useEffect(() => {
    const currentItem = menuItems.find(
      (item) => item.link === location.pathname
    );
    if (currentItem) {
      setActiveItem(currentItem.label);
    }
  }, [location, menuItems]);

  const handleItemClick = (link: string, label: string) => {
    setActiveItem(label);
    navigate(link);
  };

  return (
    <div className="sidebar">
      {menuItems.map((item) => (
        <SidebarItem
          key={item.label}
          label={item.label}
          isActive={activeItem === item.label}
          onClick={() => handleItemClick(item.link, item.label)}
          showIcon={item.showIcon}
          icon={item.icon}
          link={item.link}
        />
      ))}
    </div>
  );
};

export default SideBar;
