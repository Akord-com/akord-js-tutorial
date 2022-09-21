import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { Context } from "../store";

const LINKS = [
  ["Home", "/"],
  ["Wallet", "/wallet"],
  ["Vaults", "/vaults"],
  ["Permadiary", "/permadiary"],
];

const Layout = () => {
  const [state] = useContext(Context);

  return (
    <div className="container">
      <div className="navbar py-3 my-3">
        <a className="navbar-brand h2" href={"/"}>
          AkordJS Tutorial
        </a>
        {state.current_user && <p>{state.current_user.email}</p>}
      </div>
      <div className="row mb-5 pb-5">
        <div className="col-4">
          <nav>
            <ul className="nav flex-column">
              {LINKS.map((l, i) => (
                <li className="nav-item" key={i}>
                  <Link to={l[1]} className="nav-link ">
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
