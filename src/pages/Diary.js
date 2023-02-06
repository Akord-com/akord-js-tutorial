import React, { useState, useEffect, useCallback } from "react";
import { Akord } from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";
import useForm from "../useForm";
import ReactMarkdown from "react-markdown";

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
      console.log("loading posts ...", id);
      setIsLoading(true);
      if (id) {
        const akord = await Akord.init(
          state.current_user.wallet,
          state.current_user.jwtToken
        );
        const notes = await akord.note.list(id);

        // tesat code
        // if (notes.length > 0) {
        //   const n = await akord.note.get(notes[0]);
        //   console.log(n);
        // }

        for (var i in notes) {
          var note = notes[i];
          console.log(note);
        }

        setPosts(notes);
        console.log(notes);
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

  console.log(posts);

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
      <p>
        For your own personal, private and permanent diary, we'll first check
        for a vault called '{VAULT_TITLE}', create one if not found and post
        diary entries to it.{" "}
      </p>
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
                  {/* <ReactMarkdown>{JSON.parse(p.content)}</ReactMarkdown> */}
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
