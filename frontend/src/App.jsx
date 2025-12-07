import { Comprobantes } from "./pages/comprobantes";
import { Sucursales } from "./pages/sucursales";
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
        <Route path="/sucursales" element={<Sucursales />} />
      </Routes>
    </Router>
  );
}
