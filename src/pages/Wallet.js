import React, { useEffect } from "react";
import useForm from "../useForm";
import validate from "./LoginValidation";
import Akord from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";

const COGNITO_LOCAL_STORAGE =
  "CognitoIdentityServiceProvider.7u2a1pf5i6shfo7enci6bagk7u.LastAuthUser";

const Wallet = (props) => {
  const [state, dispatch] = useContext(Context);
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );

  async function login() {
    const akord = await Akord.signIn(values.email, values.password);
    const user = {
      email: values.email,
      wallet: akord.service.wallet,
      jwtToken: akord.api.jwtToken,
    };
    dispatch({ type: "USER_LOGIN", payload: user });
  }

  async function logout() {
    localStorage.removeItem(COGNITO_LOCAL_STORAGE);
  }

  async function getUser() {
    // Update the document title using the browser API
    if (state.current_user) {
      const akord = await Akord.init(
        {},
        state.current_user.wallet,
        state.current_user.jwtToken
      );

      const user = {
        email: values.email,
        wallet: akord.service.wallet,
        jwtToken: akord.api.jwtToken,
      };

      console.log(user);
    }
  }

  useEffect(() => {
    getUser();
  });

  if (state.current_user) {
    return (
      <div className="row">
        <div className="col">
          <h3>User wallet for {state.current_user.email}</h3>
          <p>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </p>
          <h5 className="mt-5">Raw User Object:</h5>
          <pre className="small" lines={10}>
            {JSON.stringify(state.current_user, null, 2)}
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
