import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';

const CheckoutSelesai = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const orderId = params.get("order_id") || "";
    const transactionStatus = params.get("transaction_status") || "settlement";

    const [pesanan, setPesanan] = useState(null)
    const [items, setItems] = useState([])

    useEffect(() => {
        if (!orderId) return;
        const pesananId = orderId.split("-" )[1];
        if (!pesananId) return 
        fetchDetail(pesananId);
    },[orderId])

    const fetchDetail = async (pesananId) => {
        try {
            const resPesanan = await axiosInstance.get(
                `${import.meta.env.VITE_API_URL}/pesanan`,
            );

            const dataPesanan = resPesanan.data.data.find((pesanan) => pesanan.id == pesananId,)
            setPesanan(dataPesanan);

            const resItems = await axiosInstance.get(
                `${import.meta.env.VITE_API_URL}/pesanan-items`,
            );

            const dataItems = resItems.data.data.filter(
                (items) => (items.pesanan_id = pesananId),
            )
   
            console.log(dataItems);
            setItems(dataItems)
            
        } catch (error) {
            console.log(error?.response);
        }
    }

    const totalBayar = items.reduce(
        (sum, item) => sum + item.harga * item.qty, 0,
    );

    return (
    <div>
      <div>
        <div>ICON</div>
        <h2>JUDUL</h2>
        <p>Terimakasih telah berbelanja di PeTIK Niaga</p>

        <div>

            <div>
                <span>No. Pesanan: </span>
                <span>#{orderId}</span>
            </div>

            <div>
                <span>Pelanggan</span>
                <span>{pesanan?.pelanggan?.nama}</span>
            </div>

            <div>
                <span>Tanggal</span>
                <span>{pesanan?.tanggal}</span>
            </div>

            {
                items.map((item) => (
            <div key={item.id}>
                <span>{item?.produk?.nama_barang ?? "produk"}</span>
                <span>
                    <small>
                    {item.qty} x Rp {item.harga}    
                    </small>
                </span>
                <span>Rp {item.harga * item.qty}</span>
            </div>
                ))}

            <div>
                <span>Total Bayar</span>
                <span>Rp {totalBayar}</span>
            </div>
            
        </div>

        <div>
            <span>icon</span>
            <span>Selesaikan pembayaran sesuai metode yang dipilih</span>
        </div>

        <button onClick={() => navigate("/")}>Kembali belanja</button>
      </div>
    </div>
  )
}

export default CheckoutSelesai
