import { Outlet, Link } from "react-router-dom";

const LINKS = [
  ["Home", "/"],
  ["Wallet", "/login"],
  ["Vault: @akord/akord-js", "/vault-akordjs"],
  ["Vault: Warp Contracts", "/vault-warp"],
];

const Layout = () => {
  return (
    <div className="container">
      <div className="navbar py-3 my-3">
        <a className="navbar-brand h2" href="#">
          Akord Vault Viewer
        </a>
      </div>
      <div className="row mb-5 pb-5">
        <div className="col-4">
          <nav>
            <ul className="nav flex-column">
              {LINKS.map((l, i) => (
                <li className="nav-item" key={i}>
                  <Link to={l[1]} className="nav-link">
                    {l[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="col-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
