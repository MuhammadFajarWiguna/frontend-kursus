import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosIntance";

  const AddMentor = () => {
  const navigate = useNavigate();

  const [namaMentor, setNamaMentor] = useState("");
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
    setError({});

    try {
      await axiosInstance.post(
        `/api/users/tambah`,
        {
          nama_user: namaMentor,
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
      alert("Siswa berhasil ditambahkan");
      navigate(-1);
    } catch (error) {
      console.log(error?.response);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <div className="users-page">
        <div className="users-header">
          <h3>Tambah Mentor</h3>
        </div>

        <form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-grup">
            <label htmlFor="nama_user">Nama Mentor</label>
            <input type="text" id="nama_user" onChange={(e) => setNamaMentor(e.target.value)} required />
            {error?.nama_user && (
              <span className="error" style={{ color: "red" }}>
                {error?.nama_user}
              </span>
            )}
          </div>

          <div className="form-grup">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
            {error?.email && (
              <span className="error" style={{ color: "red" }}>
                {error?.email}
              </span>
            )}
          </div>

          <div className="form-grup">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
            {error?.password && (
              <span className="error" style={{ color: "red" }}>
                {error?.password}
              </span>
            )}
          </div>

          <div className="form-grup">
            <label htmlFor="alamat">Alamat</label>
            <input type="text" id="alamat" onChange={(e) => setAlamat(e.target.value)} required />
            {error?.alamat && (
              <span className="error" style={{ color: "red" }}>
                {error?.alamat}
              </span>
            )}
          </div>

          <div className="form-grup">
            <label htmlFor="no_hp">No Handphone</label>
            <input type="text" id="no_hp" onChange={(e) => setNoHp(e.target.value)} required />
            {error?.no_hp && (
              <span className="error" style={{ color: "red" }}>
                {error?.no_hp}
              </span>
            )}
          </div>

          <div className="form-grup">
            <label htmlFor="role">Role</label>
            <input type="text" id="role" onChange={(e) => setRole(e.target.value)} required />
            {error?.role && (
              <span className="error" style={{ color: "red" }}>
                {error?.role}
              </span>
            )}
          </div>

          <div className="form-grip">
            <label htmlFor="profile">Profile</label>
            <input type="file" id="profile" accept="image/*" onChange={handleChangeImage} />
            {preview && <img src={preview} alt="image-preview" width={220} />}
            {error?.global && (
              <span className="error" style={{ color: "red" }}>
                {error?.global}
              </span>
            )}
          </div>
          {/*  */}

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
    </div>
  );
};

export default AddMentor;
