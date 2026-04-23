import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosIntance";
import Swal from "sweetalert2"; 
import "./Siswa.css";

const AddSiswa = () => {
  const navigate = useNavigate();

  const [namaSiswa, setNamaSiswa] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");
  const [role, setRole] = useState("");
  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.post(
        `/api/users/tambah`,
        {
          nama_user: namaSiswa,
          email,
          password,
          alamat,
          no_hp: noHp,
          role,
          profile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Menampilkan SweetAlert2 sukses
      Swal.fire({
        title: "Berhasil!",
        text: "Data siswa telah berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(-1); 
        }
      });
    } catch (err) {
      console.log(err?.response);

  
      Swal.fire({
        title: "Gagal!",
        text: err?.response?.data?.message || "Terjadi kesalahan saat menambah data.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
      });

      if (err?.response?.data?.errors) {
        setError(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <h3>Tambah Siswa</h3>
      </div>

      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="form-grup">
          <label htmlFor="nama_user">Nama Siswa</label>
          <input type="text" id="nama_user" onChange={(e) => setNamaSiswa(e.target.value)} required />
          {error?.nama_user && <span className="error-text">{error.nama_user}</span>}
        </div>

        <div className="form-grup">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
          {error?.email && <span className="error-text">{error.email}</span>}
        </div>

        <div className="form-grup">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
          {error?.password && <span className="error-text">{error.password}</span>}
        </div>

        <div className="form-grup">
          <label htmlFor="alamat">Alamat</label>
          <input type="text" id="alamat" onChange={(e) => setAlamat(e.target.value)} required />
          {error?.alamat && <span className="error-text">{error.alamat}</span>}
        </div>

        <div className="form-grup">
          <label htmlFor="no_hp">No Handphone</label>
          <input type="text" id="no_hp" onChange={(e) => setNoHp(e.target.value)} required />
          {error?.no_hp && <span className="error-text">{error.no_hp}</span>}
        </div>

        <div className="form-grup">
          <label htmlFor="role">Role</label>
          <input type="text" id="role" placeholder="siswa / mentor" onChange={(e) => setRole(e.target.value)} required />
          {error?.role && <span className="error-text">{error.role}</span>}
        </div>

        <div className="form-grip">
          <label htmlFor="profile">Profile</label>
          <input type="file" id="profile" accept="image/*" onChange={handleChangeImage} />
          {preview && (
            <div className="image-preview-container">
              <img src={preview} alt="image-preview" width={200} style={{ marginTop: "10px", borderRadius: "8px" }} />
            </div>
          )}
        </div>

        <div className="btn-group">
          <button type="button" onClick={() => navigate(-1)} className="btn-delete" disabled={loading}>
            Batal
          </button>

          <button type="submit" className="btn-tambah" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSiswa;
