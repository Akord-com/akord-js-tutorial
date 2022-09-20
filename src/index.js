import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Store from "./store";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import VaultWarp from "./pages/VaultWarp";
import Vaults from "./pages/Vaults";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

export default function App() {
  return (
    <Store>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Wallet />} />
              <Route path="vaults" element={<Vaults />} />
              <Route path="vault-warp" element={<VaultWarp />} />
              <Route path="*" element={<p>No Page</p>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Store>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
