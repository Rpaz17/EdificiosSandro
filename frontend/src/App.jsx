import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { NavigationLayout } from "./layouts/navigation-layout";
import { ProtectedRoute } from "./auth/ProtectedRoute";

import { Login } from "./pages/login";
import { ForgotPassword } from "./pages/forgotPassword";
import { VerificarCodigo } from "./pages/verificarCodigo";
import { MiPerfil } from "./pages/miPerfil";
import { CambiarPasswordModal } from "./pages/cambiarPasswordModal";

// Admin pages
import { Comprobantes } from "./pages/comprobantes";
import { Sucursales } from "./pages/sucursales";
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
import { ClienteComprobantes } from "./pages/clienteComprobantes";
import { ClienteDashboard } from "./pages/clienteDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verificarCodigo" element={<VerificarCodigo />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <NavigationLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="comprobantes" element={<Comprobantes />} />
          <Route path="sucursales" element={<Sucursales />} />
          <Route path="apartamentos" element={<Apartamentos />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="usuarioModal" element={<UsuarioModal />} />
          <Route path="usuarioDeleteModal" element={<UsuarioDeleteModal />} />
          <Route path="usuarioViewModal" element={<UsuarioViewModal />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="contratos" element={<Contratos />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="miPerfil" element={<MiPerfil />} />
        </Route>

        {/* CLIENTE */}
        <Route
          path="/cliente"
          element={
            <ProtectedRoute roles={["cliente"]}>
              <NavigationLayout />
            </ProtectedRoute>
          }
        >
          {/* Placeholder */}
          <Route path="dashboard" element={<ClienteDashboard />} />
          <Route path="comprobantes" element={<ClienteComprobantes />} />
          <Route path="miPerfil" element={<MiPerfil />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
