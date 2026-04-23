import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosIntance";
import MyNavbar from "../../components/MyNavbar/MyNavbar";
import Swal from "sweetalert2";

const Detail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailCourse = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/kursus/cari/${id}`);
        if (response.data && response.data.data) {
          setCourse(response.data.data);
        }
      } catch (error) {
        console.error("Gagal memuat detail kursus:", error);
        Swal.fire("Error", "Gagal mengambil data kursus", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchDetailCourse();
  }, [id]);

  const handleBuy = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "Login Diperlukan",
        text: "Silakan login untuk membeli kursus ini",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((res) => {
        if (res.isConfirmed) navigate("/login");
      });
    } else {
      navigate("/dashboard"); 
    }
  };

  if (loading) return <div style={{ textAlign: "center", padding: "50px" }}>Memuat Detail...</div>;
  if (!course) return <div style={{ textAlign: "center", padding: "50px" }}>Kursus tidak ditemukan.</div>;

  return (
    <div style={{ backgroundColor: "#fdfdfd", minHeight: "100vh" }}>
      <MyNavbar />

      <div className="container" style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>

        <button onClick={() => navigate(-1)} style={{ marginBottom: "20px", border: "none", background: "none", color: "#007bff", cursor: "pointer", fontWeight: "bold" }}>
          ← Kembali ke Daftar Kursus
        </button>

        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>

          <div style={{ flex: 1, minWidth: "300px" }}>
            <div style={{ width: "100%", height: "250px", backgroundColor: "#e9ecef", borderRadius: "15px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>📚</div>
          </div>

          <div style={{ flex: 1.5, minWidth: "300px" }}>
            <span style={{ backgroundColor: "#007bff", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem" }}>Kursus Unggulan</span>
            <h1 style={{ fontSize: "2.5rem", marginTop: "15px", color: "#222" }}>{course.nama_kursus}</h1>

            <div style={{ display: "flex", gap: "20px", margin: "20px 0", color: "#666" }}>
              <span>⭐ 4.9 (200+ Siswa)</span>
              <span>•</span>
              <span>Sertifikat Resmi</span>
            </div>

            <h3 style={{ color: "#27ae60", fontSize: "1.8rem", marginBottom: "20px" }}>Rp {course.harga?.toLocaleString("id-ID")}</h3>

            <div style={{ marginBottom: "30px" }}>
              <h4>Tentang Kursus Ini:</h4>
              <p style={{ lineHeight: "1.6", color: "#555" }}>{course.deskripsi}</p>
            </div>

            <div style={{ display: "flex", gap: "15px" }}>
              <button onClick={handleBuy} style={{ flex: 1, padding: "15px", backgroundColor: "#27ae60", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>
                Beli Sekarang
              </button>
              <button style={{ flex: 1, padding: "15px", backgroundColor: "white", color: "#007bff", border: "2px solid #007bff", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}>Simpan ke Wishlist</button>
            </div>
          </div>
        </div>

        {/* Kurikulum Dummy untuk Kesan Pro */}
        <div style={{ marginTop: "60px", padding: "30px", backgroundColor: "white", borderRadius: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
          <h3>Kurikulum Kursus</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {["Pengenalan Dasar", "Materi Inti Bagian 1", "Studi Kasus Nyata", "Ujian Akhir & Sertifikasi"].map((materi, index) => (
              <li key={index} style={{ padding: "15px 0", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}>
                <span>
                  {index + 1}. {materi}
                </span>
                <span style={{ color: "#888" }}>Video & PDF</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detail;
