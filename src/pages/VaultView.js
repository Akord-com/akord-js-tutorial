import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Akord } from "@akord/akord-js";
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
    for (let i in stacks) {
      const stack = stacks[i];
      try {
        if (stack.id) {
          const { data: file } = await akord.stack.getFile(stack.id);
          const fileUrl = URL.createObjectURL(new Blob([file]));
          setImagesUrls((current) => [...current, fileUrl]);
        }
      } catch (error) {
        console.log("Error Downloading:", error);
      }
    }
    setDownloadingGallery(false);
  };

  useEffect(() => {
    const loadVault = async (vaultId) => {
      // Update the document title using the browser API

      if (state.current_user) {
        setIsLoading(true);
        const akord = await Akord.init(
          state.current_user.wallet,
          state.current_user.jwtToken
        );
        const folders = await akord.folder.list(vaultId);
        const stacks = await akord.stack.list(vaultId);
        const notes = await akord.note.list(vaultId);
        setVault({
          folders,
          stacks,
          notes,
        });
        downloadImages(stacks, akord);
      }
      setIsLoading(false);
    };
    loadVault(params.vaultId);
  }, [state, params]);

  return (
    <>
      <h1>Vault Contents</h1>
      <p>
        Using the primative types included in the protocol, you can store data
        in your vaults.
      </p>
      <ul className="lists">
        <li>
          <b>Stacks</b> are used to store files with versioning, auditing and
          metadata.
        </li>
        <li>
          <b>Notes</b> are markdown files stored in your vault and can be used
          for documents.
        </li>
        <li>
          <b>Memos</b> are like messages and be used to create a chat group.
        </li>
      </ul>
      <pre>
        {`const folders = await akord.folder.list(vaultId);`}
        <br />
        {`const stacks = await akord.stack.list(vaultId);`}
        <br />
        {`const memos = await akord.memo.list(vaultId);`}
      </pre>
      {isLoading && <div className="spinner-border  text-light"></div>}
      <p>Upload to and download from a stack:</p>
      <pre>
        {
          "const { stackId } = await akord.stack.create(vaultId, file, 'my first file stack');"
        }
        <br />
        {"const decryptedFile = await akord.stack.file(stackId);"}
      </pre>

      <h3 className="">Displaying Images</h3>
      <div>
        <p>
          For private vaults, all data is encrypted/decrypted on the client.
          Akord-js handles encryption so can download the images and make them
          available as BLOB urls.
        </p>
        <pre>
          {`const { data: file } = await akord.stack.file(stack.id);`}
          <br />
          {`var url = URL.createObjectURL(new Blob([file]));`}
          <br />
          <br />
          {`<img src={url} />`}
        </pre>
      </div>

      {imageUrls.map((url, i) => (
        <img
          src={url}
          className=" m-1 border-no"
          key={i}
          style={{ maxHeight: "8rem" }}
          alt="vault thumbnail"
        />
      ))}
      {downloadingGallery && <div className="spinner-border  text-light"></div>}

      {vault && vault.stacks.length > 0 && (
        <div className="">
          <h3>Your Stacks</h3>
          <table className="table table-dark">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Version</th>
                <th>Type</th>
              </tr>
              {vault.stacks.map((s, i) => (
                <tr key={i} className="smaller">
                  <td>{s.id}</td>
                  <td>{s.title}</td>
                  <td>v{s.resourceVersion}</td>
                  <td>{s.files[0].fileType}</td>
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
        </div>
      )}
    </>
  );
};

export default VaultView;
