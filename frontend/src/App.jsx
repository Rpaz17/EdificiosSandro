import { Comprobantes } from "./pages/comprobantes";
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
      </Routes>
    </Router>
  );
}
