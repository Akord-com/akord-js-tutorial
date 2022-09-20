import ViewState from "./ViewState";
import useForm from "../useForm";
import validate from "./VaultValidation";

import CONTRACT from "../contract";

// Test Contract
// L51SDaFAGZnDAXhAzmEJSrfFPo1R3fyzVDY7aaZFX_M

const Dairy = (props) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    loadVault,
    validate
  );

  async function loadVault() {
    console.log("GOOD", values);
  }

  return (
    <div>
      {/* {loggedIn && <Redirect to="/default" />} */}
      <h3>Vault, Warp Contracts</h3>
      <p className="lead">
        View your vault directly from the weave using Red Stone's warp contract.
      </p>
      <p className="small">
        Example: L51SDaFAGZnDAXhAzmEJSrfFPo1R3fyzVDY7aaZFX_M
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="label">Vault ID </label>
          <div className="control">
            <input
              autoComplete="off"
              className={`form-control ${errors.email && "border-danger"}`}
              name="vaultId"
              onChange={handleChange}
              value={values.vaultId || ""}
              required
            />
            {errors.vaultId && (
              <p className="py-1 my-1 alert alert-danger">{errors.vaultId}</p>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-lg my-3">
          View Vault
        </button>
      </form>
      <ViewState
        state={CONTRACT["L51SDaFAGZnDAXhAzmEJSrfFPo1R3fyzVDY7aaZFX_M"]}
      />
    </div>
  );
};

export default Dairy;
