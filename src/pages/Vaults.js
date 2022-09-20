import React, { useState, useEffect } from "react";
import Akord from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";

const Vaults = (props) => {
  const [state] = useContext(Context);
  const [vaults, setVaults] = useState([]);

  async function loadData() {
    // Update the document title using the browser API
    if (state.current_user) {
      const akord = await Akord.init(
        {},
        state.current_user.wallet,
        state.current_user.jwtToken
      );
      const vaults = await akord.getVaults();
      setVaults(vaults);
    }
  }

  useEffect(() => {
    if (vaults.length === 0) loadData();
  });

  if (!state.current_user) {
    return (
      <div className="row">
        <div className="col">
          <h3>Login to open your Akord wallet</h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3>Your Wallets</h3>
      <ul className="group-list">
        {vaults.map((v, i) => (
          <li className="group-list-item" key={i}>
            <pre>{JSON.stringify(v, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vaults;
