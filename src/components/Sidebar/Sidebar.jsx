import React from "react";
import "./Sidebar.css";
import { FaBook, FaChalkboardTeacher, FaTachometerAlt, FaUsers } from "react-icons/fa";
import logoImg from "../../assets/logo2.png";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  if (!token) return null;
  const role = decoded.role;
  console.log(role);

  const menuAdmin = [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/dashboard/kursus", label: "Kursus", icon: <FaBook /> },
    { to: "/dashboard/siswa", label: "Siswa", icon: <FaUsers /> },
    { to: "/dashboard/mentor", label: "Mentor", icon: <FaChalkboardTeacher /> },
  ];

  const menuSiswa = [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/dashboard/kursus", label: "Kursus", icon: <FaBook /> },
    { to: "/dashboard/mentor", label: "Mentor", icon: <FaChalkboardTeacher /> },
  ];

  const menuMentor = [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/dashboard/kursus", label: "Kursus", icon: <FaBook /> },
    { to: "/dashboard/siswa", label: "Siswa", icon: <FaUsers /> },
  ];

  let menuList;
  if (role === "admin") {
    menuList = menuAdmin; 
  } else if (role === "mentor") {
    menuList = menuMentor; 
  } else {
    menuList = menuSiswa; 
  }

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="profil">
          <img src={logoImg} alt="logo" />
        </div>
        <h3 className="teks">Kursus HiFive</h3>
      </div>

      {/* Menu */}
      <div className="sidebar-menu">
        {menuList.map((menu, index) => (
          <NavLink key={index} to={menu.to} className={({ isActive }) => (isActive ? "menu-item-active" : "menu-item")}   end>
            {menu.icon}
            <span>{menu.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
