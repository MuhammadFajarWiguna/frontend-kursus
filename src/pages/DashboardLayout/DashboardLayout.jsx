import { Outlet } from "react-router-dom";
import MyNavbar from "../../components/MyNavbar/MyNavbar.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import "./DashboardLayout.css";
import { useState } from "react";

const DashboardLayout = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <MyNavbar search={search} setSearch={setSearch} />
        <main className="dashboard-content">
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
