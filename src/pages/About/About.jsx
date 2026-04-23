import React from "react";
import "./About.css"
import { useNavigate } from "react-router-dom";
const About = () => {

  const navigate = useNavigate()
  const handleBack = () => {
    navigate("/")
  }
  return (
    <div className="about">
      <button className="back-btn" onClick={handleBack}> ← Kembali ke Halaman Utama</button>
      <h1 className="about-title">Tentang HiFive Kursus</h1>

      <section className="about-section">
        <h2 className="section-title">Profil Singkat</h2>
        <p className="about-text">
          <strong>HiFive Kursus</strong> adalah lembaga pendidikan nonformal yang berkomitmen menyediakan layanan pelatihan dan pengembangan keterampilan secara profesional, berkualitas, serta sesuai dengan kebutuhan masyarakat dan
          perkembangan dunia kerja saat ini.
        </p>

        <p className="about-text">
          Kami hadir sebagai solusi pembelajaran bagi pelajar, mahasiswa, karyawan, maupun masyarakat umum yang ingin meningkatkan kompetensi diri melalui program kursus yang terarah, aplikatif, dan didukung oleh tenaga pengajar
          berpengalaman.
        </p>
      </section>

      <section className="about-section">
        <h2 className="section-title">Visi</h2>
        <p className="about-text">Menjadi lembaga kursus dan pelatihan terpercaya yang mampu mencetak sumber daya manusia unggul, kompeten, dan siap bersaing di tingkat nasional maupun global.</p>
      </section>

      <section className="about-section">
        <h2 className="section-title">Misi</h2>
        <ul className="about-list">
          <li className="about-item">Menyelenggarakan program pendidikan dan pelatihan yang berkualitas serta relevan dengan kebutuhan industri.</li>
          <li className="about-item">Memberikan metode pembelajaran yang efektif, modern, dan mudah dipahami.</li>
          <li className="about-item">Mengembangkan potensi peserta didik melalui pendampingan yang profesional.</li>
          <li className="about-item">Menciptakan lingkungan belajar yang nyaman, disiplin, dan kondusif.</li>
          <li className="about-item">Membangun generasi yang percaya diri, terampil, dan berdaya saing tinggi.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2 className="section-title">Program Pembelajaran</h2>
        <ul className="about-list">
          <li className="about-item">Bahasa Inggris</li>
          <li className="about-item">Komputer dan Microsoft Office</li>
          <li className="about-item">Desain Grafis</li>
          <li className="about-item">Digital Marketing</li>
          <li className="about-item">Pemrograman Dasar</li>
          <li className="about-item">Public Speaking</li>
          <li className="about-item">Musik dan Seni Kreatif</li>
          <li className="about-item">Keterampilan Praktis Lainnya</li>
        </ul>
      </section>

      <section className="about-section">
        <h2 className="section-title">Keunggulan Kami</h2>
        <ul className="about-list">
          <li className="about-item">Tenaga pengajar profesional dan berpengalaman</li>
          <li className="about-item">Materi pembelajaran terstruktur dan aplikatif</li>
          <li className="about-item">Fasilitas belajar yang nyaman</li>
          <li className="about-item">Jadwal fleksibel</li>
          <li className="about-item">Biaya terjangkau</li>
          <li className="about-item">Sertifikat penyelesaian kursus</li>
        </ul>
      </section>

      <section className="about-section">
        <h2 className="section-title">Penutup</h2>
        <p className="about-text">
          Dengan semangat pelayanan terbaik, <strong>HiFive Kursus</strong> siap menjadi mitra pendidikan terpercaya dalam membantu setiap peserta meraih masa depan yang lebih baik melalui peningkatan ilmu pengetahuan dan keterampilan.
        </p>
      </section>
    </div>
  );
};

export default About;
