import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosIntance";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Sedang Memproses",
      text: "Harap tunggu sebentar...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        email,
        password,
      });

      const token = response.data.data.token;

      if (token) {
        localStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        console.log("Hasil bongkar token:", decoded);

        localStorage.setItem("user", JSON.stringify(decoded));

        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          text: `Selamat datang, ${decoded.nama_user || "User"}!`,
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/dashboard");
        });
      }
    } catch (error) {
      console.error("Login gagal", error.response?.data);

      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response?.data?.message || "Email atau password salah. Silakan coba lagi.",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          <h2>Kursus HiFive</h2>
          <p>Tentukan Skill kamu</p>
        </div>

    
        <form className="login-form" onSubmit={handleLogin}>
          <h3>Login</h3>

          <div className="login-field">
            <label>Username (Email)</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Username" />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password" />
          </div>

          <button type="submit" className="btn-login">
            Masuk
          </button>

          <span className="google-login-text">Atau login dengan Google</span>
        </form>
      </div>
    </div>
  );
};

export default Login;
