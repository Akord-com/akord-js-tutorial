import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Akord } from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";
import ReactMarkdown from "react-markdown";
import vaultview_md from "../md/vaultview.md.js";

const VaultView = (props) => {
  const params = useParams();
  const [state] = useContext(Context);
  const [nodes, setNodes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadVault = async (vaultId) => {
      if (state.current_user) {
        setIsLoading(true);

        const akord = await Akord.init(state.current_user.wallet);

        const nodes = [];

        const folders = (await akord.folder.listAll(vaultId)).map((f) => [
          f.name,
          f.id,
          "folder",
        ]);
        nodes.push(...folders);

        const stacks = (await akord.stack.listAll(vaultId)).map((f) => [
          f.name,
          f.id,
          "stack",
        ]);
        nodes.push(...stacks);

        const notes = (await akord.note.listAll(vaultId)).map((f) => [
          f.name,
          f.id,
          "note",
        ]);
        nodes.push(...notes);

        const memos = (await akord.memo.listAll(vaultId)).map((f) => [
          f.name,
          f.id,
          "memo",
        ]);
        nodes.push(...memos);

        setNodes(nodes);
      }
      setIsLoading(false);
    };
    loadVault(params.vaultId);
  }, [state, params]);

  return (
    <>
      <ReactMarkdown className="md">{vaultview_md}</ReactMarkdown>
      {isLoading && <div className="spinner-border  text-light"></div>}
      {nodes && (
        <div className="">
          <hr></hr>
          <h3>Contents in your vault</h3>
          <p>
            Vault Id: <code>{params.vaultId}</code>
          </p>
          <p>
            <Link className="btn" to={`/gallery/${params.vaultId}`}>
              Photo Gallery
            </Link>
          </p>
          <table className="table table-dark">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Node</th>
              </tr>
              {nodes.map((n, i) => (
                <tr key={i} className="smaller">
                  <td>{n[1] && (n[1].slice(0, 4) + "..." + n[1].slice(-2))}</td>
                  <td>{n[0]}</td>
                  <td>{n[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default VaultView;
