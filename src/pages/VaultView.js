import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Akord from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";

const VaultView = (props) => {
  const params = useParams();
  const [state] = useContext(Context);
  const [imageUrls, setImagesUrls] = useState([]);
  const [vault, setVault] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadingGallery, setDownloadingGallery] = useState(false);

  const downloadImages = async (stacks, akord) => {
    setDownloadingGallery(true);
    for (var i in stacks) {
      var stack = stacks[i];
      console.log("downloading...", stack);
      try {
        if (stack.id) {
          var file = await akord.getStackFile(stack.id);
          var url = URL.createObjectURL(new Blob([file]));
          setImagesUrls((current) => [...current, url]);
        }
      } catch (error) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      }
    }
    setDownloadingGallery(false);
  };

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
      const notes = await akord.getNodes(vaultId, "note");
      setVault({
        folders,
        stacks,
        notes,
      });
      downloadImages(stacks, akord);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadVault(params.vaultId);
  }, []);

  return (
    <div>
      <h1>Vault Contents</h1>
      <p>Access memberships and nodes from your vault.</p>
      <pre>
        {`var file = await akord.getStackFile(stack.id);`}
        <br />
        <br />
        {`const folders = await akord.getNodes(vaultId, "folder");`}
        <br />
        {`const stacks = await akord.getNodes(vaultId, "stack");`}
        <br />
        {`const memos = await akord.getNodes(vaultId, "memo");`}
      </pre>
      {isLoading && <p>Loading...</p>}

      {imageUrls.length > 0 && (
        <div>
          <h3>BLOB Links to your decrypted files</h3>
          <p>
            For private vaults, all data is encrypted/decrypted on the client.
            Here, we download the images and make them available as BLOB urls.
          </p>
          <pre>
            {`const akord = await Akord.signIn(username, password);`}
            <br />
            {`var url = URL.createObjectURL(new Blob([file]));`}
            <br />
            <br />
            {`<img src={url} />`}
          </pre>
        </div>
      )}
      {imageUrls.map((url, i) => (
        <img
          src={url}
          className="img-thumbnail m-1 border-0"
          key={i}
          style={{ maxHeight: "8rem" }}
        />
      ))}
      {downloadingGallery && <div className="spinner-border"></div>}
      <pre>{JSON.stringify(imageUrls, null, 2)}</pre>
      {vault && (
        <div>
          <h3>Your vault's contents</h3>
          <p>
            Here we are constructing a JSON object that contains the folders,
            stacks, etc from the vault.
          </p>
          <pre>{JSON.stringify(vault, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default VaultView;
