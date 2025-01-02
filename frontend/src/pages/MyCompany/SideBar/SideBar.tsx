import React, { useEffect } from "react";
import "./SideBar.css"; // Thêm CSS để xử lý giao diện
import { FaChevronRight, FaPlus, FaBriefcase, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  showIcon?: boolean;
  icon: React.ReactNode;
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
  const navigate = useNavigate();
  const location = useLocation();

  // Xác định mục active dựa trên pathname
  const getActiveItem = () => {
    if (location.pathname === "/my-company/job-list") return "Jobs";
    if (location.pathname === "/my-company/candidates") return "Candidates";
    return "Create New"; // Mặc định là Create New cho các đường dẫn khác
  };

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
      showIcon: true,
      icon: <FaUser />,
      link: "/my-company/candidates",
    },
  ];

  useEffect(() => {
    // Cập nhật mục active khi URL thay đổi
    getActiveItem();
  }, [location]);

  const handleItemClick = (link: string) => {
    navigate(link);
  };

  return (
    <div className="sidebar">
      {menuItems.map((item) => (
        <SidebarItem
          key={item.label}
          label={item.label}
          isActive={getActiveItem() === item.label} // Xác định mục active
          onClick={() => handleItemClick(item.link)}
          showIcon={item.showIcon}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default SideBar;
