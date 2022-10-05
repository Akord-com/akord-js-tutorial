import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Akord } from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";

const Vaults = (props) => {
  const [state] = useContext(Context);
  const [vaults, setVaults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      // Update the document title using the browser API
      if (state.current_user) {
        setIsLoading(true);
        const akord = await Akord.init(
          state.current_user.wallet,
          state.current_user.jwtToken
        );
        const vaults = await akord.getVaults();
        setVaults(vaults);
      }
      setIsLoading(false);
    }
    loadData();
  }, [state]);

  return (
    <>
      <h1>Vaults</h1>
      <p>
        Akord stores your data in private, permanent and composable, user owned
        storage units called 'Vaults'.
      </p>
      <p>Using the `akord` object from signIn, you can get vaults.</p>

      <pre>
        {"const { akord } = await Akord.auth.signIn(username, password);"}
        <br />
        {"const vaults = await akord.getVaults();"}
      </pre>

      {!state.current_user && (
        <p>
          <a href="/wallet">Login with your wallet</a> to view your vaults.
        </p>
      )}

      {state.current_user && (
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Vault Id</th>
              <th>Vault Name</th>
            </tr>
          </thead>
          <tbody>
            {vaults.map((v, i) => (
              <tr key={i}>
                <td>
                  <Link to={`/vaults/${v.id}`}>{v.id}</Link>
                </td>
                <td>{v.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isLoading && <div className="spinner-border  text-light"></div>}
    </>
  );
};

export default Vaults;
