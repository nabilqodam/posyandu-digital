import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DataBalita from "./pages/DataBalita";
import JadwalPosyandu from "./pages/JadwalPosyandu";
import StatusGizi from "./pages/StatusGizi";
import LogAktivitas from "./pages/LogAktivitas";
import ManajemenAkun from "./pages/ManajemenAkun";
import Register from "./pages/Register";
import Laporan from "./pages/Laporan";
import DasbhoardOrtu from "./pages/DasbhoardOrtu";
import RekomendasiPenanganan from "./pages/RekomendasiPenanganan";
import WhoReference from "./pages/WhoReference";

function App() {
  return (
    <Router>
      <Routes>


        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/balita"
          element={
            <ProtectedRoute>
              <Layout>
                <DataBalita />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jadwal"
          element={
            <ProtectedRoute>
              <Layout>
                <JadwalPosyandu />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/status-gizi/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <StatusGizi />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/log-aktivitas"
          element={
            <ProtectedRoute>
              <Layout>
                <LogAktivitas />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manajemen-akun"
          element={
            <ProtectedRoute>
              <Layout>
                <ManajemenAkun />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/anak/:childId"
          element={
            <ProtectedRoute>
              <Layout>
                <DasbhoardOrtu />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/laporan"
          element={
            <ProtectedRoute>
              <Layout>
                <Laporan />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/rekomendasi/:childId"
          element={
            <ProtectedRoute>
              <Layout>
                <RekomendasiPenanganan />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/who-reference"
          element={
            <ProtectedRoute>
              <Layout>
                <WhoReference />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;