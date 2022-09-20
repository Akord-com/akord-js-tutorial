import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import VaultWarp from "./pages/VaultWarp";
import VaultAkord from "./pages/VaultAkord";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

export default function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Wallet />} />
            <Route path="vault-warp" element={<VaultWarp />} />
            <Route path="vault-akordjs" element={<VaultAkord />} />
            <Route path="*" element={<p>No Page</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
