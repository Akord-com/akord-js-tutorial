import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Akord from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";

const Vaults = props => {
  const [state] = useContext(Context);
  const [vaults, setVaults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      // Update the document title using the browser API
      if (state.current_user) {
        setIsLoading(true);
        const akord = await Akord.init(
          {},
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
      <p>Akord enables 'User Owned Storage' as composable web3 vaults. </p>
      <pre>
        {"const akord = await Akord.signIn(username, password);"}
        <br />
        {"const vaults = await akord.getVaults();"}
      </pre>

      {!state.current_user && (
        <p>
          <a href="/wallet">Login with your wallet</a> to view your vaults.
        </p>
      )}

      {isLoading && <div className="spinner-border"></div>}

      {vaults.map((v, i) => (
        <div className="card my-3" key={i}>
          <div className="card-body">
            <h3 className="card-title">
              <Link to={`/vaults/${v.id}`}>{v.name}</Link>
            </h3>
            <pre>{JSON.stringify(v, null, 2)}</pre>
          </div>
        </div>
      ))}
    </>
  );
};

export default Vaults;
