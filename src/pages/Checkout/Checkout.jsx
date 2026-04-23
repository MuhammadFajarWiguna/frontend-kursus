import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Checkout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userToken = token ? jwtDecode(token) : null;
  const isAdmin = userToken?.role === "admin" || userToken?.role === "superadmin";

  const [step, setStep] = useState(1);
  const [qty, setQty] = useState(1);
  const [produk, setProduk] = useState(null);
  const [pelanggan, setPelanggan] = useState(null);

  const { uuid } = useParams();

  useEffect(() => {
    const script = document.createElement("script")

    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key",import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [])

  useEffect(() => {
    getProduk();
    getPelangganLogin();
  }, []);

  const getProduk = async () => {
    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/produk/${uuid}`);
      //   console.log(response);

      setProduk(response.data.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const totalHarga = produk ? produk.harga * qty : 0;

  const handleLanjutPembayaran = (e) => {
    e.preventDefault();

    if (qty > produk.stok) {
        alert(`stok tersedia hanya ${produk.stok}`);
        return
    }
    setStep(2)
  };

  const getPelangganLogin = async () => {
    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/pelanggan`);

      const userLogin = response.data.data.find((pelanggan) => {
        return pelanggan.user_id === userToken?.userId;
      });

    //   console.log(userLogin);
      // console.log(response);

      setPelanggan(userLogin);
    } catch (error) {
      console.log(error?.response);
    }
  };

   const handleBayar = async () => {
    try {
        // 1. Buat Pesanan
        const resPesanan = await axiosInstance.post(
            `${import.meta.env.VITE_API_URL}/pesanan`,
        {
        tanggal: new Date().toISOString().split("T")[0],
        pelanggan_id: pelanggan.id,
        total: totalHarga,   
        },
        );
        const pesananId = resPesanan.data.data.id;
        // 2. Buat Pesanan-items
        await axiosInstance.post(
            `${import.meta.env.VITE_API_URL}/pesanan-items`,
            {
                pesanan_id: pesananId,
                barang_id: produk.id,
                qty,
                harga: produk.harga,
            },
        );
        // 3. Bayar menggunakan midtrans | ambil snap token
        const resSnap = await axiosInstance.post(
          `${import.meta.env.VITE_API_URL}/midtrans/snap-token`,
          {
            pesanan_id: pesananId,
            total: totalHarga,
            pelanggan: {nama: pelanggan.nama, no_hp: pelanggan.no_hp},
            finish_url: `${import.meta.env.VITE_FRONTEND_URL}/checkout/selesai`,
            error_url: `${import.meta.env.VITE_FRONTEND_URL}/checkout/gagal`,
            cancel_url: `${import.meta.env.VITE_FRONTEND_URL}/checkout/batal`,
          },
        );
        // console.log(resSnap);
        const snapToken = resSnap.data.data.token;
        // 4. Buka Popup Midtrans
        window.snap.pay(snapToken,{
          onSuccess: (result) => {
              navigate(
            `/checkout/selesai?order_id=${result.order_id}&transaction_status=${result.transaction_status}&pesanan_id=${pesananId}&total=${totalHarga}`,
          );
            // navigate(`/`);
            console.log(result);
            
          },
        });
    } catch (error) {
        console.log(error?.response);
        
    }
   }
  return (
    <div>
      <h3>Checkout</h3>
      {/* Step Indikator */}
      <p>
        {step} dari 2: {step === 1 ? "Informasi" : "Pembayaran"}
      </p>

      {/* Detail Produk */}
      {/* Cara 2 optional chaining */}
      <div>
        <p>{produk?.nama_barang}</p>
        <p>Harga: Rp {produk?.harga.toLocaleString("id-ID")}</p>
        <p>{produk?.stok}</p>
        <p>
          <strong>Total Rp {totalHarga.toLocaleString("id-ID")}</strong>
        </p>
      </div>

      {/* cara 1 ternery */}
      {/* {produk ? (
        <div>
          <p>{produk.nama_barang}</p>
          <p>Harga: Rp {produk.harga.toLocaleString("id-ID")}</p>
          <p>{produk.stok}</p>
          <p>
            <strong>Total: Rp</strong>
          </p>
        </div>
      ) : (
        <p>Memuat data...</p>
      )} */}

      {/* Step 1: Informasi */}
      {step === 1 && (
        <form onSubmit={handleLanjutPembayaran}>
          <p>Pembeli: {pelanggan?.nama}</p>
          <div>
            <label htmlFor="jumlah">Jumlah: </label>
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
            <input type="number" name="jumlah" id="jumlah" value={qty} onChange={(e) => setQty(e.target.value)} />
            <button type="button" onClick={() => setQty((q) => Math.max(1, q + 1))}>+</button>
          </div>
          <button type="submit">Lanjut Ke Pembayaran &raquo;</button>
        </form>
      )}
      {/* Step 2: Informasi */}
      {
        step === 2 && (
            <div>
               <p>Pembeli: {pelanggan.nama}</p>
               <p> Total: Rp {totalHarga.toLocaleString("id-ID")}</p>
                <button onClick={() => setStep(1)}>&laquo; Sebelumnya</button>
                <button onClick={handleBayar}
                >{`Bayar ${totalHarga.toLocaleString("id-ID")}`}</button>
            </div>
        )}
    </div>
  );
};

export default Checkout;
