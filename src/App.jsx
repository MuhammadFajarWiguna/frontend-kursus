import React from "react";

import Landing from "./pages/LandingPage/Landing";
import MyNavbar from "./components/MyNavbar/MyNavbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";
import { Outlet, Route, Routes } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout/DashboardLayout";
import { DashboardProvider } from "./context/DashboardContext";
import About from "./pages/About/About";
import Kursus from "./pages/Kursus/Kursus";
import AddKursus from "./pages/Kursus/AddKursus";
import EditKursus from "./pages/Kursus/EditKursus";
import Siswa from "./pages/Siswa/Siswa";
import AddSiswa from "./pages/Siswa/AddSiswa";
import EditSiswa from "./pages/Siswa/EditSiswa";
import Mentor from "./pages/Mentor/Mentor";
import AddMentor from "./pages/Mentor/AddMentor";
import EditMentor from "./pages/Mentor/EditMentor";

import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Detail from "./pages/Detail/Detail";

const App = () => {
  return (
    <>
      <DashboardProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
            <Route
              path="kursus/:id"
              element={
                <ProtectedRoute allowedRoles={["admin", "mentor", "siswa"]}>
                  <Detail />
                </ProtectedRoute>
              }
            />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />

            <Route
              path="kursus"
              element={
                <ProtectedRoute allowedRoles={["admin", "mentor", "siswa"]}>
                  <Kursus />
                </ProtectedRoute>
              }
            />

           
            <Route
            
              path="kursus/add"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AddKursus />
                </ProtectedRoute>
              }
            />
            <Route
              path="kursus/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <EditKursus />
                </ProtectedRoute>
              }
            />

            <Route
              path="siswa"
              element={
                <ProtectedRoute allowedRoles={["admin", "mentor"]}>
                  <Siswa />
                </ProtectedRoute>
              }
            />
            <Route
              path="siswa/add"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AddSiswa />
                </ProtectedRoute>
              }
            />
            <Route
              path="siswa/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <EditSiswa />
                </ProtectedRoute>
              }
            />

            <Route
              path="mentor"
              element={
                <ProtectedRoute allowedRoles={["admin", "siswa"]}>
                  <Mentor />
                </ProtectedRoute>
              }
            />
            <Route
              path="mentor/add"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AddMentor />
                </ProtectedRoute>
              }
            />
            <Route
              path="mentor/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <EditMentor />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<h2>Halaman Tidak Ditemukan</h2>} />
        </Routes>
      </DashboardProvider>
    </>
  );
};

export default App;
