import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import axiosInstance from "../../utils/AxiosIntance";
import "./Kursus.css";

const Kursus = () => {
  const navigate = useNavigate();
  const { search = "" } = useOutletContext();

  const [kursus, setKursus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getKursus();
  }, []);

  const getKursus = async () => {
    setLoading(true);
    try {
      const result = await axiosInstance.get(`/api/kursus`);
    
      setKursus(result.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data kursus:", error);
    } finally {
      setLoading(false);
    }
  };


  const filteredData = kursus.filter((item) => {
    return item.nama_kursus.toLowerCase().includes(search.toLowerCase());
  });

  // PAGINATION
  const ITEMS_PER_PAGE = 5;
  const totalPage = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDelete = async (id) => {
    const msg = window.confirm("Yakin ingin menghapus kursus ini?");
    if (!msg) return;
    try {
      await axiosInstance.delete(`/api/kursus/hapus/${id}`);
      alert("Berhasil dihapus");
      getKursus(); 
    } catch (error) {
      console.log("Gagal hapus:", error?.response);
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/kursus/edit/${id}`);
  };

  return (
    <div className="kursus-page">
      <div className="kategori-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
        <h3>Daftar Kursus</h3>
        <NavLink to="/dashboard/kursus/add" className="btn-add">
          Tambah Kursus
        </NavLink>
      </div>

      <div className="table-wrapper">
        <table className="kursus-table" border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Kursus</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Harga</th>
              <th>Status</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Selesai</th>
              <th>Thumbnail</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Memuat data...
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td>{item.nama_kursus}</td>
                  <td>{item.judul}</td>
                  <td>{item.deskripsi}</td>
                  <td>Rp {item.harga?.toLocaleString("id-ID")}</td>
                  <td>{item.status}</td>
                  <td>{item.tgl_mulai}</td>
                  <td>{item.tgl_selesai}</td>
                  <td>
                    {item.thumbnail ? (
                      <img
                        src={`https://hakam.petik.or.id/uploads/${item.thumbnail}`}
                        alt={item.nama_kursus}
                        width={120}
                        style={{ borderRadius: "5px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/120x80?text=No+Image";
                        }}
                      />
                    ) : (
                      <span>Tidak ada gambar</span>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPage > 1 && (
        <div className="pagination" style={{ marginTop: "15px", display: "flex", gap: "5px" }}>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            &laquo; Prev
          </button>

          {Array.from({ length: totalPage }).map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ backgroundColor: currentPage === i + 1 ? "#007bff" : "white", color: currentPage === i + 1 ? "white" : "black" }}>
              {i + 1}
            </button>
          ))}

          <button disabled={currentPage === totalPage} onClick={() => setCurrentPage((p) => p + 1)}>
            &raquo; Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Kursus;
