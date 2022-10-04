import React, { useState, useEffect } from "react";
import { Akord } from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";
import useForm from "../useForm";

const VAULT_TITLE = "My Vault Diary";

const Dairy = props => {
  const [vaultId, setVaultId] = useState(null);
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createPrompt, setCreatePrompt] = useState(false);
  const [state] = useContext(Context);

  const { values, errors, handleChange, handleSubmit } = useForm(
    postToDiary,
    () => true
  );

  async function postToDiary() {
    setIsLoading(true);
    if (state.current_user && vaultId) {
      const akord = await Akord.init(
        state.current_user.wallet,
        state.current_user.jwtToken
      );
      // give it a name, sortable by the date it was posted, then title
      const name = `${new Date(Date.now()).toISOString()} ${values.title}`;
      const note = await akord.note.create(vaultId, name, values.content);
      console.log(note);
      setNote(note);
    }
    setIsLoading(false);
  }

  const handleCreateVault = async () => {
    setIsLoading(true);
    if (state.current_user) {
      const akord = await Akord.init(
        state.current_user.wallet,
        state.current_user.jwtToken
      );
      const vault = await akord.vault.create(
        VAULT_TITLE //+ " " + Date.now().toString()
      );
      setVaultId(vault.vaultId);
      setCreatePrompt(false);
      console.log(vault.vaultId);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    async function findDiaryVault() {
      // Update the document title using the browser API
      if (state.current_user) {
        setIsLoading(true);
        const akord = await Akord.init(
          state.current_user.wallet,
          state.current_user.jwtToken
        );
        const vaults = await akord.getVaults();
        const vault = vaults.filter(v => v.name === VAULT_TITLE);
        if (vault.length === 0) {
          setVaultId(null);
          setCreatePrompt(true);
        } else {
          setVaultId(vault[0].id);
          setCreatePrompt(false);
        }

        // console.log(vault);
      }
      setIsLoading(false);
    }
    findDiaryVault();
  }, [state]);

  return (
    <>
      <h1>PermaDiary</h1>
      <p className="lead">
        Post and read from your encrypted, user owned vault.
      </p>
      <p>
        For our private perma-diary, we will create a new Akord Vault. Each post
        in the diary will be stored as a 'Note'. Notes are text files using the
        markdown format.
      </p>
      <pre>
        {`const { akord } = await Akord.auth.signIn(username, password);`}
        <br />
        {`const { vaultId } = await akord.vault.create("Vault Diary");`}
      </pre>
      <p>
        Then we can write some markdown and post it as an entry to the Diary
      </p>
      <pre>
        {`const { akord } = await Akord.auth.signIn(username, password);`}
        <br />
        {`const name = nameOfThePost;`}
        <br />
        {`const content = '# Hello World, from Akord';`}
        <br />
        <br />
        {`const note = await akord.note.create(vaultId, 'Hello World', content);`}
      </pre>

      {!state.current_user && (
        <p>
          <a href="/wallet">Login with your wallet</a> to access your Vault
          Diary.
        </p>
      )}

      {isLoading && (
        <div>
          <span className="spinner-border" />
        </div>
      )}

      {isLoading && !createPrompt && !vaultId && (
        <p>Searching for your diary's vault ...</p>
      )}

      {createPrompt && (
        <div className="my-3">
          <h3>Create your Vault</h3>
          <p>
            A vault for your diary was not found in your wallet. We'll need to
            create a vault named `{VAULT_TITLE}` to continue.
          </p>
          <button
            className="btn btn-lg btn-primary"
            onClick={handleCreateVault}
          >
            Create your Diary
          </button>
        </div>
      )}

      {vaultId && (
        <form onSubmit={handleSubmit} noValidate>
          <h3>Post to your Diary</h3>
          <div className="field">
            <p className="label">
              Vault Name : {VAULT_TITLE}
              <br />
              Vault ID : {vaultId}
            </p>
            <div className="control">
              <label className="label my-2">Title:</label>
              <input
                type="text"
                className="form-control"
                name="title"
                onChange={handleChange}
                value={values.title || ""}
                required
              ></input>
            </div>
            <div className="control">
              <label className="label my-2">Your diary entry:</label>
              <textarea
                className={`form-control ${errors.content && "border-danger"}`}
                name="content"
                onChange={handleChange}
                value={values.content || ""}
                rows={5}
                required
              ></textarea>
              {errors.content && (
                <p className="py-1 my-1 alert alert-danger">{errors.content}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg my-3"
            disabled={!values.content}
          >
            Save to the Vault
          </button>
        </form>
      )}

      {note && (
        <div className="">
          <p>Your transaction was successfully submitted.</p>
          <pre>{JSON.stringify(note, null, 2)}</pre>
        </div>
      )}
    </>
  );

  // return (
  //   <div>
  //     {/* {loggedIn && <Redirect to="/default" />} */}
  //     <h3>Vault, Warp Contracts</h3>
  //     <p className="lead">
  //       View your vault directly from the weave using Red Stone's warp contract.
  //     </p>
  //     <p className="small">
  //       Example: L51SDaFAGZnDAXhAzmEJSrfFPo1R3fyzVDY7aaZFX_M
  //     </p>

  //     <form onSubmit={handleSubmit} noValidate>
  //       <div className="field">
  //         <label className="label">Vault ID </label>
  //         <div className="control">
  //           <input
  //             autoComplete="off"
  //             className={`form-control ${errors.email && "border-danger"}`}
  //             name="vaultId"
  //             onChange={handleChange}
  //             value={values.vaultId || ""}
  //             required
  //           />
  //           {errors.vaultId && (
  //             <p className="py-1 my-1 alert alert-danger">{errors.vaultId}</p>
  //           )}
  //         </div>
  //       </div>
  //       <button type="submit" className="btn btn-primary btn-lg my-3">
  //         View Vault
  //       </button>
  //     </form>
  //     <ViewState
  //       state={CONTRACT["L51SDaFAGZnDAXhAzmEJSrfFPo1R3fyzVDY7aaZFX_M"]}
  //     />
  //   </div>
  // );
};

export default Dairy;
