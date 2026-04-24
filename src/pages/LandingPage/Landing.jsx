import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosIntance";
import CourseImg from "../../assets/kursus.png";
import MyNavbar from "../../components/MyNavbar/MyNavbar";
import Swal from "sweetalert2";
import "./Landing.css";
import { useDashboard } from "../../context/DashboardContext";

const Landing = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);


  const { search } = useDashboard();

  const getCourses = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/kursus");
      if (response.data && response.data.data) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data kursus:", error?.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Perlu Login",
        text: "Silakan login terlebih dahulu untuk membeli kursus ini",
        showCancelButton: true,
        confirmButtonColor: "#007bff",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Login Sekarang",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Lanjutkan Pembayaran",
        text: "Mengarahkan kamu ke dashboard untuk menyelesaikan transaksi.",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        navigate("/dashboard");
      });
    }
  };

  const filteredKursus = courses.filter((item) => {
    return item.nama_kursus.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="landing" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <MyNavbar />

      <div className="container" style={{ padding: "40px 20px" }}>
     
        <section className="hero" style={{ display: "flex", alignItems: "center", marginBottom: "80px", gap: "40px" }}>
          <div className="hero-left" style={{ flex: 1 }}>
            <span style={{ color: "#007bff", fontWeight: "bold", textTransform: "uppercase", fontSize: "0.9rem" }}>Upgrade Your Skills</span>
            <h1 style={{ fontSize: "3rem", marginBottom: "20px", lineHeight: "1.2", color: "#222" }}>
              Temukan Kursus Terbaik, <br />
              <span style={{ color: "#007bff" }}>Asah Skill Kamu!</span>
            </h1>
            <p style={{ color: "#666", marginBottom: "30px", fontSize: "1.1rem" }}>Bergabunglah dengan ribuan siswa lainnya di Kursus HiFive. Belajar langsung dari praktisi industri.</p>
            <button
              onClick={() => {
                document.getElementById("daftar-kursus").scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                padding: "15px 30px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
                boxShadow: "0 4px 15px rgba(0,123,255,0.3)",
              }}
            >
              Lihat Semua Kursus
            </button>
          </div>
          <div className="hero-right" style={{ flex: 1, textAlign: "right" }}>
            <img src={CourseImg} alt="Hero" style={{ maxWidth: "100%", height: "auto", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))" }} />
          </div>
        </section>

        <section id="daftar-kursus" className="kursus">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
            <div>
              <h2 style={{ borderLeft: "5px solid #007bff", paddingLeft: "15px", marginBottom: "5px" }}>Daftar Kursus</h2>
              <p style={{ color: "#777", marginLeft: "20px" }}>Pilih program yang sesuai dengan minat kariermu</p>
            </div>
          </div>

          <div
            className="kursus-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "30px",
            }}
          >
            {loading ? (
              <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "50px" }}>
                <p>Sedang memuat data kursus terbaik...</p>
              </div>
            ) : filteredKursus.length > 0 ? ( 
              filteredKursus.map((item) => (
                <div
                  key={item.id}
                  className="card-kursus"
                  style={{
                    border: "none",
                    padding: "0",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    backgroundColor: "#fff",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div style={{ padding: "25px", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                      <span style={{ backgroundColor: "#e7f3ff", color: "#007bff", padding: "5px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold" }}>Best Seller</span>
                      <span style={{ color: "#f1c40f", fontSize: "0.9rem" }}>⭐ 4.9</span>
                    </div>

                    <h3 style={{ fontSize: "1.25rem", marginBottom: "12px", color: "#333", fontWeight: "bold" }}>{item.nama_kursus}</h3>
                    <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "20px", lineHeight: "1.5", height: "50px", overflow: "hidden" }}>{item.deskripsi}</p>

                    <div style={{ borderTop: "1px solid #eee", paddingTop: "15px", marginTop: "auto" }}>
                      <span style={{ fontWeight: "800", color: "#2d3436", fontSize: "1.2rem" }}>Rp {item.harga?.toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  <div className="btn-group" style={{ display: "flex", padding: "0 25px 25px 25px", gap: "10px" }}>
                    <button onClick={() => navigate(`/kursus/${item.id}`)} style={{ flex: 1, padding: "10px", backgroundColor: "#f1f2f6", color: "#2f3542", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
                      Detail
                    </button>
                    <button
                      onClick={() => handleBuy(item.id)}
                      style={{ flex: 1, padding: "10px", backgroundColor: "#27ae60", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", boxShadow: "0 4px 10px rgba(39,174,96,0.2)" }}
                    >
                      Beli Sekarang
                    </button>
                  </div>
                </div>
              ))
            ) : (
     
              <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "50px" }}>
                <h3>Maaf, kursus "{search}" tidak ditemukan.</h3>
                <p>Coba gunakan kata kunci lain.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <footer style={{ marginTop: "100px", padding: "40px", textAlign: "center", color: "#888", borderTop: "1px solid #eee" }}>
        <p>&copy; 2026 Kursus HiFive. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
