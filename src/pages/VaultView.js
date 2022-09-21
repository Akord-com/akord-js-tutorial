import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Akord from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";

const VaultView = (props) => {
  const params = useParams();
  const [state] = useContext(Context);
  const [imageUrls, setImagesUrls] = useState([])
  const [vault, setVault] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const downloadImages = async (stacks, akord) => {
    for (var i in stacks) {
      var stack = stacks[i];
      console.log("downloading...", stack);
      try {
        if (stack.id) {
          var file = await akord.getStackFile(stack.id);
          var url = URL.createObjectURL(new Blob([file]));
          setImagesUrls(current => [...current, url]);
        }
      } catch (error) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      }
    }
  }



  const loadVault = async (vaultId) => {
    // Update the document title using the browser API

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
      downloadImages(stacks, akord)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadVault(params.vaultId);
  }, []);

  return (
    <div>
      <h1>Vault Contents</h1>
      <p>Access memberships and nodes from your vault.</p>
      <pre>
        {"const akord = await Akord.signIn(username, password);"}
        <br />
        {"const vaults = await akord.getVaults();"}
      </pre>
      {isLoading && <p>Loading...</p>}

      {imageUrls.map((url, i) => (
        <img src={url} className="img-thumbnail m-1 border-0" key={i} style={{ maxHeight: '8rem' }} />
      ))}

      <pre>{JSON.stringify(imageUrls, null, 2)}</pre>
      <pre>{JSON.stringify(vault, null, 2)}</pre>
    </div>
  );
};

export default VaultView;
