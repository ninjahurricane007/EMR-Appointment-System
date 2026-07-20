import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<SuperAdminDashboard />} />

        <Route path="/receptionist" element={<ReceptionistDashboard />} />

        <Route path="/doctor" element={<DoctorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
