import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PublicRoutes from "./pages/PublicRoutes";
import ReportIncident from "./pages/ReportIncident";
import Login from "./pages/login";
import AdminDashboard from "./pages/AdminDashboard";
import VerificadorDashboard from "./pages/VerificadorDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CreateUsuario from "./pages/CreateUsuario";
import EditUsuario from "./pages/EditUsuario";
import Carreteras from "./pages/Carreteras";
import Incidentes from "./pages/Incidentes";
import EditarPass  from "./pages/EditarPass"
import CarreterasList from "./pages/CarreterasList";
import CrearCarretera from "./pages/crearCarretera";
import EditarCarretera from "./pages/EditarCarreteras";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicRoutes />} />
        <Route path="/report" element={<ReportIncident />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/verificador" element={<VerificadorDashboard />} />
        <Route path="/usuarios/crear" element={<CreateUsuario />} />
        <Route path="/usuarios/editar/:id" element={<EditUsuario />} />
        <Route path="/carreteras" element={< Carreteras/>} />
        <Route path="/incidentes" element={<Incidentes />} />
        <Route path="/usuarios/editarpass/:id" element={<EditarPass />} />
        <Route path="/carretera/lista" element={<CarreterasList />} />
        <Route path="/carretera/crear" element={<CrearCarretera />} />
        <Route path="/carretera/editar/:id" element={<EditarCarretera />} />
      </Routes>
    </Router>
  );
};

export default App;
