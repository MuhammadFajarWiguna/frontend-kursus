import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useDashboard } from "../../context/DashboardContext";
import "./MyNavbar.css";

const MyNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  const { search, setSearch } = useDashboard();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("User terdeteksi di Navbar:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Gagal parse user:", error);
        setUser(null);
      }
    }
  }, []);

  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="logo">Hifive</div>
        <div className="nav-links">
          <NavLink to="/">Beranda</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
      </div>

      <div className="nav-search">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Cari Kursus..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="nav-right">
        <div className="user">
          <FaUserCircle />

          <span>{user?.nama_user || "Guest"}</span>

          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyNavbar;
