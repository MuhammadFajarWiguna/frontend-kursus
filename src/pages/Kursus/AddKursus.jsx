import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosIntance";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./Kursus.css"; // Menggunakan CSS yang sama agar konsisten

const AddKursus = () => {
  const navigate = useNavigate();

  const [namaKursus, setNamaKursus] = useState("");
  const [judul, setJudul] = useState("");
  const [status, setStatus] = useState("");
  const [tglMulai, setTglMulai] = useState("");
  const [tglSelesai, setTglSelesai] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.post(
        `/api/kursus/tambah`,
        {
          nama_kursus: namaKursus,
          judul,
          deskripsi,
          harga: Number(harga),
          status,
          tgl_mulai: tglMulai,
          tgl_selesai: tglSelesai,
          thumbnail,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      
      Swal.fire({
        title: "Berhasil!",
        text: "Kursus baru telah berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "Mantap",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(-1);
        }
      });
    } catch (err) {
      console.log(err?.response);

  
      Swal.fire({
        title: "Gagal Menambahkan",
        text: err?.response?.data?.message || "Pastikan semua data terisi dengan benar.",
        icon: "error",
        confirmButtonText: "Tutup",
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
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <h3>Tambah Kursus</h3>
      </div>

      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="form-grup">
          <label htmlFor="nama">Nama Kursus</label>
          <input type="text" id="nama" onChange={(e) => setNamaKursus(e.target.value)} required />
          {error?.nama_kursus && (
            <span className="error" style={{ color: "red" }}>
              {error.nama_kursus}
            </span>
          )}
        </div>

        <div className="form-grup">
          <label htmlFor="judul">Judul</label>
          <input type="text" id="judul" onChange={(e) => setJudul(e.target.value)} required />
          {error?.judul && (
            <span className="error" style={{ color: "red" }}>
              {error.judul}
            </span>
          )}
        </div>

        <div className="form-grup">
          <label htmlFor="status">Status</label>
          <select id="status" className="form-control" onChange={(e) => setStatus(e.target.value)} required>
            <option value="">-- Pilih Status --</option>
            <option value="offline">Offline</option>
            <option value="online">Online</option>
          </select>
          {error?.status && (
            <span className="error" style={{ color: "red" }}>
              {error.status}
            </span>
          )}
        </div>

        <div className="form-grup-row" style={{ display: "flex", gap: "15px" }}>
          <div className="form-grup" style={{ flex: 1 }}>
            <label htmlFor="tgl_mulai">Tanggal Mulai</label>
            <input type="date" id="tgl_mulai" onChange={(e) => setTglMulai(e.target.value)} required />
          </div>
          <div className="form-grup" style={{ flex: 1 }}>
            <label htmlFor="tgl_selesai">Tanggal Selesai</label>
            <input type="date" id="tgl_selesai" onChange={(e) => setTglSelesai(e.target.value)} required />
          </div>
        </div>

        <div className="form-grup">
          <label htmlFor="deskripsi">Deskripsi Kursus</label>
          <textarea id="deskripsi" rows="4" onChange={(e) => setDeskripsi(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}></textarea>
          {error?.deskripsi && (
            <span className="error" style={{ color: "red" }}>
              {error.deskripsi}
            </span>
          )}
        </div>

        <div className="form-grup">
          <label htmlFor="harga">Harga (IDR)</label>
          <input type="number" id="harga" onChange={(e) => setHarga(e.target.value)} required />
          {error?.harga && (
            <span className="error" style={{ color: "red" }}>
              {error.harga}
            </span>
          )}
        </div>

        <div className="form-grip">
          <label htmlFor="thumbnail">Thumbnail Kursus</label>
          <input type="file" id="thumbnail" accept="image/*" onChange={handleChangeImage} />
          {preview && (
            <div style={{ marginTop: "10px" }}>
              <img src={preview} alt="image-preview" width={220} style={{ borderRadius: "8px", border: "1px solid #ddd" }} />
            </div>
          )}
        </div>

        <div className="btn-group" style={{ marginTop: "20px" }}>
          <button type="button" onClick={() => navigate(-1)} className="btn-delete" disabled={loading}>
            Batal
          </button>

          <button type="submit" className="btn-tambah" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Kursus"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddKursus;
