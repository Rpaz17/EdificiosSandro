import { Comprobantes } from "./pages/comprobantes";
import { Sucursales } from "./pages/sucursales";
import { Apartamentos } from "./pages/apartamentos";

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
        <Route path="/comprobantes" element={<Comprobantes />} />
        <Route path="/sucursales" element={<Sucursales />} />
        <Route path="/apartamentos" element={<Apartamentos />} />
      </Routes>
    </BrowserRouter>
  );
}
