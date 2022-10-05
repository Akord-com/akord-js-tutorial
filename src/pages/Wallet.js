import React, { useEffect, useState } from "react";
import useForm from "../useForm";
import validate from "./LoginValidation";
import { Akord } from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";

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
    const { jwtToken, wallet } = await Akord.auth.signIn(
      values.email,
      values.password
    );
    const user = {
      email: values.email,
      wallet: wallet,
      jwtToken: jwtToken,
    };
    setIsLoading(false);
    dispatch({ type: "USER_LOGIN", payload: user });
  }

  async function logout() {
    localStorage.removeItem(COGNITO_LOCAL_STORAGE);
    setIsLoading(false);
    dispatch({ type: "USER_LOGOUT" });
  }

  useEffect(() => {
    async function getUser() {
      // Update the document title using the browser API
      if (state.current_user) {
        const { jwtToken, wallet } = await Akord.init(
          state.current_user.wallet,
          state.current_user.jwtToken
        );

        const user = {
          email: values.email,
          wallet: wallet,
          jwtToken: jwtToken,
        };

        console.log(user);
      }
    }
    getUser();
  }, [state, values]);

  return (
    <>
      <h1>Wallets</h1>
      <p>
        Users hold their private keys in their 'wallet'. Wallets are encrypted
        with the user's password and is shared across the user's devices.
      </p>
      <p>We can use the signIn call from Akord :</p>
      <pre>
        {
          "const { akord, jwtToken, wallet } = await Akord.auth.signIn(email, pass);"
        }
        <br />
        <br />
        {"console.log(jwtToken);"}
        <br />
        {"console.log(wallet);"}
      </pre>
      <p>
        If successfull, we get back an `akord` instance along with the jwtToken
        and Wallet, both useful for making API calls and decrypting data.
      </p>

      {state.current_user && (
        <div>
          <h3>Akord Wallet</h3>
          <p>
            This wallet is encrypted with a key derived from the username/password and stored as an attribute in an AWS Cognito account.  You are free to roll your own wallet service or simply leverage the Akord Wallet.
          </p>
          <pre>{state.current_user.email}</pre>
          <p>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </p>
          <h3>JWT Token:</h3>
          <pre>{state.current_user.jwtToken}</pre>
          <h3>Wallet Object:</h3>
          <pre className="small" lines={10}>
            {JSON.stringify(state.current_user.wallet, null, 2)}
          </pre>
        </div>
      )}

      {!state.current_user && (
        <div>
          {/* {loggedIn && <Redirect to="/default" />} */}
          <h3>Login to your Akord Wallet</h3>
          <p>
            Sign up for a free wallet at{" "}
            <a href="http://v2.akord.com" target="_blank" rel="noreferrer">
              v2.akord.com
            </a>
          </p>
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
                  className={`form-control transparent-input ${errors.password && "border-danger"}`}
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
            {!isLoading && (
              <button
                type="submit"
                className="btn btn-primary btn-lg my-3"
                disabled={!values.password || !values.email}
              >
                Login
              </button>
            )}
            {isLoading && (
              <button
                className="btn btn-primary btn-lg my-3"
                type="button"
                disabled
              >
                <span className="spinner-border spinner-border-sm  text-light"></span>
                &nbsp;Login
              </button>
            )}
            <div className="alert-highlight">
              <h3>Attention: You are decrypting your wallet</h3>
              <p>
                After logging in, your wallet will be decrypted an its contents
                will be presented on the next screen. Please take precautions to
                protect your wallet.
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Wallet;
