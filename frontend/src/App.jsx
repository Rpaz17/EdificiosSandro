import { Comprobantes } from "./pages/comprobantes";
import { Sucursales } from "./pages/sucursales";
import { Login } from "./pages/login";
import { ForgotPassword } from "./pages/forgotPassword";
import { VerificarCodigo } from "./pages/verificarCodigo";
import { Apartamentos } from "./pages/apartamentos";
import { Usuarios } from "./pages/usuarios";
import { UsuarioModal } from "./pages/usuarioModal";
import { UsuarioDeleteModal } from "./pages/usuarioDeleteModal";
import { UsuarioViewModal } from "./pages/usuarioViewModal";
import { Clientes } from "./pages/clientes";
import { Contratos } from "./pages/contratos";
import { Reportes } from "./pages/reportes";
import { KPICard } from "./pages/kpiCards";
import { Dashboard } from "./pages/dashboard";
import { Mantenimientos } from "./pages/mantenimientos";
import { MiPerfil } from "./pages/miPerfil";
import { CambiarPasswordModal } from "./pages/cambiarPasswordModal";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { NavigationLayout } from "./layouts/navigation-layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavigationLayout />}>
          {/*Todo lo que tenga sidebar aqui*/}
          <Route path="/comprobantes" element={<Comprobantes />} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/apartamentos" element={<Apartamentos />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarioModal" element={<UsuarioModal />} />
          <Route path="/usuarioDeleteModal" element={<UsuarioDeleteModal />} />
          <Route path="/usuarioViewModal" element={<UsuarioViewModal />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/contratos" element={<Contratos />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/kpiCards" element={<KPICard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mantenimientos" element={<Mantenimientos />} />
          <Route path="/miPerfil" element={<MiPerfil />} />
          <Route
            path="/cambiarPasswordModal"
            element={<CambiarPasswordModal />}
          />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verificarCodigo" element={<VerificarCodigo />} />
      </Routes>
    </BrowserRouter>
  );
}
