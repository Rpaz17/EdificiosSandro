import { Comprobantes } from "./pages/comprobantes";
import { Sucursales } from "./pages/sucursales";
import { Login } from "./pages/login";
import { ForgotPassword } from "./pages/forgotPassword";
import { VerificarCodigo } from "./pages/verificarCodigo";
import { Apartamentos } from "./pages/apartamentos";
import { Clientes } from "./pages/clientes";

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
          <Route path="/clientes" element={<Clientes />} />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verificarCodigo" element={<VerificarCodigo />} />
      </Routes>
    </BrowserRouter>
  );
}
