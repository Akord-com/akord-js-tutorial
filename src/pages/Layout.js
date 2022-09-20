import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { Context } from "../store";

const LINKS = [
  ["Home", "/"],
  ["Wallet", "/wallet"],
  ["Vaults", "/vaults"],
  ["Diary", "/diary"],
];

const Layout = () => {
  const [state] = useContext(Context);

  return (
    <div className="container">
      <div className="navbar py-3 my-3">
        <a className="navbar-brand h2" href={"/#"}>
          Akord Vault Viewer
        </a>
      </div>
      <div className="row mb-5 pb-5">
        <div className="col-4">
          {state.current_user && (
            <h5>Logged in as {state.current_user.email}</h5>
          )}
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
