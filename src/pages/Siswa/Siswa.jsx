import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import axiosInstance from "../../utils/AxiosIntance";
import "./Siswa.css";

const Siswa = () => {
  const navigate = useNavigate();
  const { search = "" } = useOutletContext();

  const [siswa, setSiswa] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSiswa();
  }, []);

  const getSiswa = async () => {
    setLoading(true);
    try {
      const result = await axiosInstance.get(`/api/users`);

      const allUser = result.data.data || [];
      const OnlySiswa = allUser.filter((user) => user.role === "siswa");
      setSiswa(OnlySiswa);
      // console.log(OnlySiswa);
    } catch (error) {
      console.error("Gagal mengambil data siswa", error);
    } finally {
      setLoading(false);
    }
  };

  // LOGIKA FILTER: Mencari berdasarkan nama kursus
  const filteredData = siswa.filter((s) => {
    return s.nama_user.toLowerCase().includes(search.toLowerCase());
  });

  // PAGINATION
  const ITEMS_PER_PAGE = 5;
  const totalPage = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDelete = async (id) => {
    const msg = window.confirm("Yakin ingin menghapus kursus ini?");
    if (!msg) return;
    try {
      await axiosInstance.delete(`/api/users/delete/${id}`);
      alert("Berhasil dihapus");
      getSiswa(); // Refresh data setelah hapus
    } catch (error) {
      console.log("Gagal hapus:", error?.response);
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/siswa/edit/${id}`);
  };

  return (
    <div className="kursus-page">
      <div className="kategori-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
        <h3>Daftar Siswa</h3>
        <NavLink to="/dashboard/siswa/add" className="btn-add">
          Tambah Siswa
        </NavLink>
      </div>

      <div className="table-wrapper">
        <table className="kursus-table" border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Siswa</th>
              <th>Email</th>
              <th>Alamat</th>
              <th>No Hp</th>
              <th>Profile</th>
              <th>Status</th>
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
                  <td>{item.nama_user}</td>
                  <td>{item.email}</td>
                  <td>{item.alamat}</td>
                  <td>{item.no_hp}</td>
                  <td>
                    {item.profile ? (
                      <img
                        src={`https://hakam.petik.or.id/uploads/${item.profile}`}
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
                    <td>{item.role}</td>
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

export default Siswa;
