import React, { useState } from "react";
import { Link } from "react-router-dom";
import useForm from "../useForm";
import validate from "./LoginValidation";
import SpinnerButton from "./SpinnerButton";
import { Auth, Akord } from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";
import ReactMarkdown from "react-markdown";
import wallet from "../md/wallet.md";

const COGNITO_LOCAL_STORAGE =
  "CognitoIdentityServiceProvider.7u2a1pf5i6shfo7enci6bagk7u.LastAuthUser";

const Wallet = (props) => {
  const [state, dispatch] = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );

  async function login() {
    setIsLoading(true);
    const { jwt, wallet } = await Auth.signIn(
      values.email,
      values.password
    );
    const user = {
      email: values.email,
      wallet: wallet,
      jwtToken: jwt,
    };
    setIsLoading(false);
    dispatch({ type: "USER_LOGIN", payload: user });
  }

  async function logout() {
    localStorage.removeItem(COGNITO_LOCAL_STORAGE);
    setIsLoading(false);
    dispatch({ type: "USER_LOGOUT" });
  }

  return (
    <>
      <ReactMarkdown>{wallet}</ReactMarkdown>

      {state.current_user && (
        <div>
          <h3>Akord Wallet</h3>
          <p>
            This wallet is encrypted with a key derived from the
            username/password. The encrypted wallet is stored as an attribute in
            an AWS Cognito account.
          </p>
          <pre>{state.current_user.email}</pre>
          <h3>JWT Token</h3>
          <p>
            The token is required to access the endpoints from the Akord API.
            The token expires after 1 hour.
          </p>
          <pre>{state.current_user.jwtToken}</pre>
          <h3>Recovery Phrase</h3>
          <p>
            The following 12 words are used to generate your wallet. They are
            also required to restore/reset your Akord password.
          </p>
          <pre className="small" lines={10}>
            {state.current_user.wallet.backupPhrase}
          </pre>
          <p>
            <button className="btn" onClick={logout}>
              Logout
            </button>{" "}
            &nbsp;
            <Link
              to={"/vaults"}
              className="btn"
              onClick={() => {
                window.scroll({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              Next, Vaults
            </Link>
          </p>
        </div>
      )}

      {!state.current_user && (
        <div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label className="label my-2">Email</label>
              <div className="control">
                <input
                  autoComplete="off"
                  className={`form-control transparent-input ${errors.email && "border-danger"
                    }`}
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
              <label className="label my-2">Password</label>
              <div className="control">
                <input
                  className={`form-control transparent-input ${errors.password && "border-danger"
                    }`}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password || ""}
                  required
                />
              </div>
              {errors.password && (
                <p className="py-1 my-1 alert alert-danger">
                  {errors.password}
                </p>
              )}
            </div>
            <SpinnerButton
              title="Login"
              loading={isLoading}
              disabled={!values.password || !values.email}
            />
          </form>
          <p>
            If you need an Akord wallet,{" "}
            <a href="http://v2.akord.com">sign up for a free account</a>.
          </p>
          <div className="alert-highlight">
            <h3>Attention: You are decrypting your wallet</h3>
            <p>
              After logging in, your wallet will be decrypted and your recovery
              phrase will be displayed. Please make sure to take security
              precautions when working with exposed secrets.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Wallet;
