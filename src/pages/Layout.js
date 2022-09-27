import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Context } from "../store";

const LINKS = [
  ["Home", "/"],
  ["Wallet", "/wallet"],
  ["Vaults", "/vaults"],
  ["PermaDiary", "/permadiary"]
];

const Layout = () => {
  const [state] = useContext(Context);

  return (
    <main className="d-flex flex-nowrap">
      <h1 className="visually-hidden">Akord-JS Tutorial</h1>
      <div
        className="d-flex flex-column flex-shrink-0 text-white bg-dark p-3 d-none d-md-block"
        id="navbarToggle"
        style={{ width: "280px" }}
      >
        <a href="/" className="d-block text-decoration-none">
          {/* <svg className="bi me-2" width="40" height="32"></svg> */}
          <h3 className="text-light">Akord-JS Tutorial</h3>
        </a>
        {state.current_user && (
          <p className="d-block">{state.current_user.email}</p>
        )}
        <NavLinks />
        <GitHubLink />
      </div>

      <div
        className="d-block flex-column scrollarea p-3"
        style={{ width: "800px", margin: "0 auto" }}
      >
        <MobileLinks />

        <Outlet />
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
            {l[0]}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const MobileLinks = () => {
  const location = useLocation();
  return (
    <div className="d-md-none">
      <a href="/" className="d-block text-decoration-none">
        <h3 className="text-dark">Akord-JS Tutorial</h3>
      </a>
      <ul className="nav nav-pills flex-column mb-auto bg-light p-3 rounded">
        {LINKS.map((l, i) => (
          <li className="nav-item" key={i}>
            <Link
              to={l[1]}
              className={`nav-link ${
                location.pathname === l[1] ? "active" : "text-dark"
              }`}
            >
              {l[0]}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
};

const GitHubLink = () => {
  return (
    <div className="py-3">
      <a
        href="http://github.com/akord-com/akord-js-tutorial"
        target="_blank"
        style={{ color: "#efefef" }}
        rel="noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-github"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
      </a>
    </div>
  );
};

export default Layout;
