import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/AxiosIntance";

const EditKursus = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const getKursusById = async () => {
      try {
        const response = await axiosInstance.get(`/api/kursus/cari/${id}`);
        console.log(response);
        const data = response.data.data;

        setNamaKursus(data.nama_kursus);
        setJudul(data.judul);
        setDeskripsi(data.deskripsi);
        setHarga(data.harga);
        setStatus(data.status);
        setTglMulai(data.tgl_mulai.split(" ")[0]);
        setTglSelesai(data.tgl_selesai.split(" ")[0]);
        setPreview(`https://hakam.petik.or.id/uploads/${data.thumbnail}`);

        
      } catch (error) {
        console.log(error?.response);
      }
    };
    getKursusById();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await axiosInstance.patch(
        `api/kursus/ubah/${id}`,
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
      navigate(-1);
    } catch (error) {
      console.log(error.response);
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
    <div>
      <div className="users-header">
        <h3>Edit Produk</h3>
      </div>

      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="form-grip">
          <label htmlFor="nama_kursus">Nama Kursus</label>
          <input 
          type="text" 
          id="nama_kursus" 
          value={namaKursus} 
          placeholder="Contoh: Kursus Bahasa Asing" 
          onChange={(e) => setNamaKursus(e.target.value)} required />
          {errors?.nama_kursus && (
            <span className="error" style={{ color: "red" }}>
              {errors?.nama_kursus}
            </span>
          )}
        </div>

        <div className="form-grip">
          <label htmlFor="judul">Judul</label>
          <input 
          type="text" 
          id="judul" 
          value={judul} 
          placeholder="Contoh: English Languange" 
          onChange={(e) => setJudul(e.target.value)} required />
          {errors?.judul && (
            <span className="error" style={{ color: "red" }}>
              {errors?.judul}
            </span>
          )}
        </div>

        <div className="form-grip">
          <label htmlFor="status">Status</label>
          <input 
          type="text" 
          id="status" 
          value={status} 
          placeholder="Contoh: Offline atau Online" 
          onChange={(e) => setStatus(e.target.value)} required />
          {errors?.status && (
            <span className="error" style={{ color: "red" }}>
              {errors?.status}
            </span>
          )}
        </div>

        <div className="form-grip">
          <label htmlFor="tgl_mulai">Tanggal Mulai</label>
          <input 
          type="date" 
          id="tgl_mulai" 
          value={tglMulai} 
          onChange={(e) => setTglMulai(e.target.value)} required />
          {errors?.tgl_mulai && (
            <span className="error" style={{ color: "red" }}>
              {errors?.tgl_mulai}
            </span>
          )}
        </div>

        <div className="form-grip">
          <label htmlFor="tgl_selesai">Tanggal Selesai</label>
          <input 
          type="date" 
          id="tgl_selesai" 
          value={tglSelesai} 
          onChange={(e) => setTglSelesai(e.target.value)} required />
          {errors?.tgl_selesai && (
            <span className="error" style={{ color: "red" }}>
              {errors?.tgl_selesai}
            </span>
          )}
        </div>

      

        <div className="form-grip">
          <label htmlFor="thumbnail">Thumbnail</label>
          <input type="file" id="thumbnail" accept="image/*" onChange={handleChangeImage} />
          {preview && <img src={preview} alt="image-preview" width={220} />}
          {errors?.global && (
            <span className="error" style={{ color: "red" }}>
              {errors?.global}
            </span>
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

export default EditKursus;
