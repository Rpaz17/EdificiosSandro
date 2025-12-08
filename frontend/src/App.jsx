import { Comprobantes } from "./pages/comprobantes";
import { Sucursales } from "./pages/sucursales";
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
