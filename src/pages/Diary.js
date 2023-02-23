import React, { useState, useEffect, useCallback } from "react";
import { Akord } from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";
import useForm from "../useForm";
import ReactMarkdown from "react-markdown";
import diary_md from "../md/diary.md";

const VAULT_TITLE = "My Vault Diary";

const Dairy = (props) => {
  const [vaultId, setVaultId] = useState(null);
  const [posts, setPosts] = useState(null);
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createPrompt, setCreatePrompt] = useState(false);
  const [state] = useContext(Context);

  const { values, errors, handleChange, handleSubmit } = useForm(
    postToDiary,
    () => true
  );

  // async function loadPosts(id) {
  const loadPosts = useCallback(
    async (id) => {
      setIsLoading(true);
      if (id) {
        const akord = await Akord.init(
          state.current_user.wallet,
          state.current_user.jwtToken
        );

        // get list of notes and download the file
        const notes = await akord.note.listAll(id);
        for (var i in notes) {
          const file = await akord.note.getVersion(notes[i].id);
          // save the name/content to our posts array
          notes[i].title = file.name;
          notes[i].content = file.data;
        }
        setPosts(notes);
      }
      setIsLoading(false);
    },
    [state]
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
      const note = await akord.note.create(vaultId, values.content, name);
      setNote(note);
      await loadPosts(vaultId);
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
      await loadPosts(vault.vaultId);
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
        const vaults = await akord.vault.list();
        const vault = vaults.filter((v) => v.name === VAULT_TITLE);
        if (vault.length === 0) {
          setVaultId(null);
          setCreatePrompt(true);
        } else {
          await loadPosts(vault[0].id);
          setVaultId(vault[0].id);
          setCreatePrompt(false);
        }

        // console.log(vault);
      }
      setIsLoading(false);
    }
    findDiaryVault();
  }, [state, loadPosts]);

  return (
    <>
      <ReactMarkdown>{diary_md}</ReactMarkdown>

      {!state.current_user && (
        <p>
          <a href="/wallet">Login with your wallet</a> to access your Vault
          Diary.
        </p>
      )}

      {isLoading && (
        <div>
          <span className="spinner-border  text-light" />
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

      {posts && (
        <div className="">
          <h3>Previous Posts</h3>
          {posts.map((p, i) => (
            <div className="card bg-dark my-3" key={i}>
              <div className="card-body">
                <h4 className="card-title">{p.title}</h4>
                <p className="card-text">
                  <ReactMarkdown>{p.content}</ReactMarkdown>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Dairy;
