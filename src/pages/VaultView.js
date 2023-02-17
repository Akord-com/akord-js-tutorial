import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Akord } from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";

// markdown
import Md from '../md/Md';
import vaultview from '../md/vaultview.md';

const VaultView = (props) => {
  const params = useParams();
  const [state] = useContext(Context);
  const [vault, setVault] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadVault = async (vaultId) => {
      // Update the document title using the browser API

      if (state.current_user) {
        setIsLoading(true);
        const akord = await Akord.init(
          state.current_user.wallet,
          state.current_user.jwtToken
        );
        const folders = await akord.folder.listAll(vaultId);
        const stacks = await akord.stack.listAll(vaultId);
        const notes = await akord.note.listAll(vaultId);
        setVault({
          folders,
          stacks,
          notes,
        });
      }
      setIsLoading(false);
    };
    loadVault(params.vaultId);
  }, [state, params]);

  console.log(vault);

  return (
    <>
      <Md src={vaultview} />
      {isLoading && <div className="spinner-border  text-light"></div>}
      {vault && vault.stacks.length > 0 && (
        <div className="">
          <h3>Your Stacks</h3>
          <p>
            <Link to={`/gallery/${params.vaultId}`}>View this vault as a photo gallery</Link>

          </p>
          <table className="table table-dark">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Version</th>
              </tr>
              {vault.stacks.map((s, i) => (
                <tr key={i} className="smaller">
                  <td>{s.id.slice(0, 4)}</td>
                  <td>{s.name}</td>
                  <td>v{s.resourceVersion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {vault && vault.notes.length > 0 && (
        <div>
          <h3>Your Notes</h3>
          <table className="table table-dark">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Version</th>
              </tr>
              {vault.notes.map((s, i) => (
                <tr key={i} className="smaller">
                  <td>{s.id}</td>
                  <td>{s.title}</td>
                  <td>v{s.resourceVersion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {vault && (
        <div className="">
          <h3>Your vault's contents</h3>
          <p>
            Here we are constructing a JSON object that contains the folders,
            stacks, etc from the vault.
          </p>
          <pre>{JSON.stringify(vault, null, 2)}</pre>
          <h3>Download Links for your Vault</h3>
          <p>
            Here we list the stacks with their permaweb download link. If your
            vault is private, you will need to decrypt yourself or use
            `akord.stack.getFile(stackId)`.
          </p>
          <pre>
            {JSON.stringify(vault.stacks)}
            {/* {JSON.stringify(
              vault.stacks.map((s) => ({
                stackId: s.id,
                url: `http://arweave.net/${s.files.at(-1).resourceTx}`,
              })),
              null,
              2
            )} */}
          </pre>
        </div>
      )}
    </>
  );
};

export default VaultView;
