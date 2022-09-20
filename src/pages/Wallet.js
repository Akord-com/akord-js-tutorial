import React, { useState, useEffect } from "react";
import useForm from "../useForm";
import validate from "./LoginValidation";
// import { signIn, currentUser } from "../helpers.js";
import Akord from "@akord/akord-js";

const COGNITO_LOCAL_STORAGE =
  "CognitoIdentityServiceProvider.7u2a1pf5i6shfo7enci6bagk7u.LastAuthUser";

const Wallet = (props) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );

  async function login() {
    setLoggedIn(true);
    // const user = await signIn(values.email, values.password);
    setUser(user);
  }

  async function logout() {
    localStorage.removeItem(COGNITO_LOCAL_STORAGE);
    setUser(null);
    setLoggedIn(false);
  }

  async function getUser() {
    // Update the document title using the browser API
    if (!user) {
      // console.log(`loading current user...`);
      // const user = await currentUser();
      // if (user) {
      //   setUser(user);
      // }
    }
  }

  useEffect(() => {
    getUser();
  });

  if (user) {
    return (
      <div className="row">
        <div className="col">
          <h3>User wallet for {user.attributes.email}</h3>
          <p>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </p>
          <h5 className="mt-5">User Attributes</h5>
          <ul className="list-group">
            {Object.keys(user.attributes).map((a, i) => (
              <li className="list-group-item" key={i}>
                <h6>{a}</h6>
                <pre>{user.attributes[a]}</pre>
              </li>
            ))}
          </ul>
          <h5 className="mt-5">Raw User Object:</h5>
          <pre className="small" lines={10}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* {loggedIn && <Redirect to="/default" />} */}
      <h3>Login to your Akord Wallet</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              autoComplete="off"
              className={`form-control ${errors.email && "is-danger"}`}
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email || ""}
              required
            />
            {errors.email && (
              <p className="py-1 my-1 alert alert-danger">{errors.email}</p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className={`form-control ${errors.password && "is-danger"}`}
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password || ""}
              required
            />
          </div>
          {errors.password && (
            <p className="py-1 my-1 alert alert-danger">{errors.password}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary btn-lg my-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Wallet;
