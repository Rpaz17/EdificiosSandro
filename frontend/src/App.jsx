import { Comprobantes } from "./pages/comprobantes";
import { Sucursales } from "./pages/sucursales";
import { Login } from "./pages/login";
import { ForgotPassword } from "./pages/forgotPassword";
import { VerificarCodigo } from "./pages/verificarCodigo";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/comprobantes" element={<Comprobantes />} />
        <Route path="/" element={<Login />} />
        <Route path="/sucursales" element={<Sucursales />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verificarCodigo" element={<VerificarCodigo />} />
      </Routes>
    </Router>
  );
}
