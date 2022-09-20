import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Akord from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";

const Vaults = (props) => {
  const params = useParams();
  const [state] = useContext(Context);
  const [vaults, setVaults] = useState([]);
  const [vault, setVault] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    loadData();
  }, []);

  console.log(params);

  return (
    <div>
      <h1>Vaults</h1>
      <p>Access your public or private vaults.</p>
      <pre>
        {"const akord = await Akord.signIn(username, password);"}
        <br />
        {"const vaults = await akord.getVaults();"}
      </pre>

      {isLoading && <div className="spinner-border"></div>}

      {!state.current_user && (
        <p>
          <a href="/wallet">Login with your wallet</a> to view your vaults.
        </p>
      )}

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
    </div>
  );
};

export default Vaults;