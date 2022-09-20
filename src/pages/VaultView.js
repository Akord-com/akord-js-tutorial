import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Akord from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";

const VaultView = (props) => {
  const params = useParams();
  const [state] = useContext(Context);
  const [vault, setVault] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function loadVault(vaultId) {
    // Update the document title using the browser API
    console.log("loadVault");
    if (state.current_user) {
      setIsLoading(true);
      const akord = await Akord.init(
        {},
        state.current_user.wallet,
        state.current_user.jwtToken
      );
      const folders = await akord.getNodes(vaultId, "folder");
      const stacks = await akord.getNodes(vaultId, "stack");
      setVault({
        folders,
        stacks,
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadVault(params.vaultId);
  }, []);

  console.log(params);
  return (
    <div>
      <h1>Vault Contents</h1>
      <p>Access memberships and nodes from your vault.</p>
      <pre>
        {"const akord = await Akord.signIn(username, password);"}
        <br />
        {"const vaults = await akord.getVaults();"}
      </pre>

      <pre>{JSON.stringify(vault, null, 2)}</pre>
    </div>
  );
};

export default VaultView;
