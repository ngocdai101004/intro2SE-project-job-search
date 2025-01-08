import React, { ReactNode } from "react";
import SideBar from "../SideBar/SideBar";
import MyHeader from "../../../components/MyHeader";

// Định nghĩa kiểu cho props
interface MainLayoutProps {
  children: ReactNode; // Kiểu dữ liệu cho children
  company_id: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, company_id }) => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar bên trái */}
      <div style={{ width: "180px", height: "100%" }}>
        <SideBar company_id={company_id} />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <MyHeader mydefaultActiveKey="/company" />

        <div style={{ flex: 1, overflowY: "auto" }}>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
