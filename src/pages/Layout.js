import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Context } from "../store";

const LINKS = [
  ["Wallet", "/wallet", "/images/wallet.svg"],
  ["Vaults", "/vaults", "/images/vault.svg"],
  ["PermaDiary", "/permadiary", "/images/pencil.svg"]

];

const Layout = () => {
  const [state] = useContext(Context);

  return (
    <main className="d-flex flex-nowrap">
      <h1 className="visually-hidden">Akord-JS Tutorial</h1>
      <div
        className="d-flex flex-column flex-shrink-0 text-white sidebar p-3 d-none d-md-block"
        id="navbarToggle"
        style={{ width: "280px" }}
      >
        <a href="/" className="d-block text-decoration-none">
          {/* <svg className="bi me-2" width="40" height="32"></svg> */}
          <h3 className=""><b>Akord-JS</b> Tutorial</h3>
        </a>
        {state.current_user && (
          <p className="d-block">{state.current_user.email}</p>
        )}
        <NavLinks />
      </div>

      <div
        className="d-block flex-column scrollarea p-3"
        style={{ width: "100%" }}
      >
        <MobileLinks />
        <div className="col-12 p-3" style={{ margin: "0 auto" }}>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

const NavLinks = () => {
  const location = useLocation();
  return (
    <ul className="nav nav-pills flex-column mb-auto">
      {LINKS.map((l, i) => (
        <li className="nav-item" key={i}>
          <Link
            to={l[1]}
            className={`nav-link ${location.pathname === l[1] ? "active" : ""}`}
          >
            <img src={l[2]} className={"float-start me-3"} />
            {l[0]}
          </Link>
        </li>
      ))}
      <li className="nav-item">
        <a className="nav-link" target={"_blank"} href="http://github.com/akord-com/akord-js-tutorial">
          <img src="/images/github.svg" className="float-start me-3" />Github
        </a>
      </li>
    </ul>
  );
};

const MobileLinks = () => {
  const location = useLocation();
  return (
    <div className="d-md-none">
      <a href="/" className="d-block text-decoration-none">
        <h3>Akord-JS Tutorial</h3>
      </a>
      <ul className="nav nav-pills flex-column mb-auto rounded">
        {LINKS.map((l, i) => (
          <li className="nav-item" key={i}>
            <Link
              to={l[1]}
              className={`nav-link ${location.pathname === l[1] ? "active" : ""
                }`}
            >
              <img src={l[2]} className={"float-start me-3"} />
              {l[0]}
            </Link>
          </li>
        ))}
        <li className="nav-item">
          <a className="nav-link" target={"_blank"} href="http://github.com/akord-com/akord-js-tutorial">
            <img src="/images/github.svg" className="float-start me-3" />Github
          </a>
        </li>
      </ul>
      <hr />
    </div>
  );
};


export default Layout;
