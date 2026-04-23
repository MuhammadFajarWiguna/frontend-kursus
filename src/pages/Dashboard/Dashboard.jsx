import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/AxiosIntance";
import { FaUsers, FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMentor: 0,
    totalSiswa: 0,
    totalKursus: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [resUsers, resKursus] = await Promise.all([axiosInstance.get("/api/users"), axiosInstance.get("/api/kursus")]);

      const allUsers = resUsers.data.data || [];
      const allKursus = resKursus.data.data || [];

      setStats({
        totalMentor: allUsers.filter((u) => u.role === "mentor").length,
        totalSiswa: allUsers.filter((u) => u.role === "siswa").length,
        totalKursus: allKursus.length,
      });
    } catch (error) {
      console.error("Gagal mengambil data dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter data khusus untuk Recharts (Pie Chart)
  const chartData = [
    { name: "Mentor", value: stats.totalMentor },
    { name: "Siswa", value: stats.totalSiswa },
  ];

  // Warna untuk masing-masing bagian Pie Chart
  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div className="dashboard-page">
      <h3>Dashboard Overview</h3>

      {/* Stats Cards Section */}
      <div className="dashboard-cards">
        <div className="dashboard-card blue">
          <div className="dashboard-card-icon">
            <FaChalkboardTeacher />
          </div>
          <div className="dashboard-card-info">
            <p>Total Mentor</p>
            <h4>{loading ? "..." : stats.totalMentor} Orang</h4>
          </div>
        </div>

        <div className="dashboard-card green">
          <div className="dashboard-card-icon">
            <FaUsers />
          </div>
          <div className="dashboard-card-info">
            <p>Total Siswa</p>
            <h4>{loading ? "..." : stats.totalSiswa} Siswa</h4>
          </div>
        </div>

        <div className="dashboard-card purple">
          <div className="dashboard-card-icon">
            <FaBookOpen />
          </div>
          <div className="dashboard-card-info">
            <p>Total Kursus</p>
            <h4>{loading ? "..." : stats.totalKursus} Materi</h4>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="dashboard-chart-section" style={{ marginTop: "30px", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <h4 style={{ marginBottom: "20px", textAlign: "center" }}>Data Mentor & Siswa</h4>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
