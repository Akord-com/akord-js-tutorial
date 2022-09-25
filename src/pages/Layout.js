import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Context } from "../store";

const LINKS = [
  ["Home", "/"],
  ["Wallet", "/wallet"],
  ["Vaults", "/vaults"],
  ["Permadiary", "/permadiary"],
];

const Layout = () => {
  const [state] = useContext(Context);

  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="container">
      <div className="navbar py-3 my-3">
        <a className="navbar-brand h2" href={"/"}>
          AkordJS Tutorial
        </a>
        {state.current_user && <p>{state.current_user.email}</p>}
      </div>
      <div className="row mb-5 pb-5">
        <div className="col-lg-4 ">
          <ul className="nav nav-pills flex-column mb-3 nav-danger">
            {LINKS.map((l, i) => (
              <li className="nav-item" key={i}>
                <Link
                  to={l[1]}
                  className={`nav-link ${
                    location.pathname === l[1] ? "active" : ""
                  }`}
                >
                  {l[0]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
