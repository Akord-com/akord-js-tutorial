import React, { useState, useEffect } from "react";
import Akord from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";

// import ViewState from "./ViewState";
// import useForm from "../useForm";
// import validate from "./VaultValidation";

// import CONTRACT from "../contract";

// Test Contract
// L51SDaFAGZnDAXhAzmEJSrfFPo1R3fyzVDY7aaZFX_M

const VAULT_TITLE = "My Vault Diary";

const Dairy = (props) => {
  const [vaultId, setVaultId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [state] = useContext(Context);

  // const { values, errors, handleChange, handleSubmit } = useForm(
  //   loadVault,
  //   validate
  // );

  // async function loadVault() {
  //   console.log("GOOD", values);
  // }

  async function findDiaryVault() {
    // Update the document title using the browser API
    if (state.current_user) {
      setIsLoading(true);
      const akord = await Akord.init(
        {},
        state.current_user.wallet,
        state.current_user.jwtToken
      );
      const vaults = await akord.getVaults();
      console.log(vaults)

    }
    setIsLoading(false);
  }

  useEffect(() => {
    findDiaryVault();
  }, []);

  return (
    <div>
      <h1>Diary</h1>
      <p className="lead">Post and read from your encrypted, user owned Vault Diary.</p>
      <p>Create a new vault for the diary</p>
      <pre>
        {`const akord = await Akord.signIn(username, password);`}
        <br />
        {`const { vaultId } = await akord.vaultCreate("Vault Diary");`}
      </pre>

      <p>Post a new entry to the Diary</p>
      <pre>
        {`const akord = await Akord.signIn(username, password);`}
        <br />
        {`const note = await akord.noteCreate(vaultId, name, content);`}
      </pre>

      {!state.current_user && (
        <p>
          <a href="/wallet">Login with your wallet</a> to access your Vault Diary.
        </p>
      )}


    </div>


  )

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
