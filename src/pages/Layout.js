import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Context } from "../store";

// NAV LINKS : title, path, icon, active icon
const LINKS = [
  ["Wallet", "/wallet", "/images/wallet.svg", "/images/wallet-dark.svg"],
  ["Vaults", "/vaults", "/images/vault.svg", "/images/vault-dark.svg"],
  [
    "Diary",
    "/permadiary",
    "/images/pencil.svg",
    "/images/pencil-dark.svg",
  ],
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
        <a href="/" className="d-block text-decoration-none mb-3">
          <img src="/images/akord-js.svg" alt="AkordJS Tutorial"></img>
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
        <div
          className="col"
          style={{ margin: "0px 10px 20px 10px", maxWidth: "650px" }}
        >
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
            <img
              src={l[location.pathname !== l[1] ? 2 : 3]}
              className={"float-start"}
              alt={location.pathname}
            />
            {l[0]}
          </Link>
        </li>
      ))}
      <li className="nav-item">
        <a
          className="nav-link"
          target={"_blank"}
          href="http://github.com/akord-com/akord-js-tutorial"
          rel="noreferrer"
        >
          <img src="/images/github.svg" className="float-start" alt="github" />
          Github
        </a>
      </li>
    </ul>
  );
};

const MobileLinks = () => {
  const location = useLocation();
  return (
    <div className="d-md-none text-center">
      <a href="/" className="d-block text-decoration-none">
        <h3 className="brand-logo">
          <span className="brand-logo-bold">AKORD-JS</span> TUTORIAL
        </h3>
      </a>
      <ul className="nav nav-pills nav-fill justify-content-center">
        {LINKS.map((l, i) => (
          <li className="nav-item " key={i}>
            <Link
              to={l[1]}
              className={`nav-link ${location.pathname === l[1] ? "active" : ""
                }`}
            >
              {l[0]}
            </Link>
          </li>
        ))}
        <li className="nav-item">
          <a
            className="nav-link"
            target={"_blank"}
            href="http://github.com/akord-com/akord-js-tutorial"
            rel="noreferrer"
          >
            Github
          </a>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default Layout;
