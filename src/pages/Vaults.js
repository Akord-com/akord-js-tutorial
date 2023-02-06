import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Akord } from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const Vaults = (props) => {
  const [state] = useContext(Context);
  const [vaults, setVaults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      // Update the document title using the browser API
      if (state.current_user) {
        setIsLoading(true);
        const akord = await Akord.init(
          state.current_user.wallet,
          state.current_user.jwtToken
        );
        const vaults = await akord.vault.list();
        setVaults(vaults);
      }
      setIsLoading(false);
    }
    loadData();
  }, [state]);

  const options = ["ACTIVE", "ARCHIVED", "DELETED"];
  const defaultOption = options[0];
  const [status, setStatus] = useState(defaultOption);
  const onStatusChange = (v) => {
    setStatus(v.value);
  };

  return (
    <>
      <h1>Vaults</h1>
      <p>
        Akord Protocol stores your data in private or public, permanent, user
        owned storage units called 'Vaults'.
      </p>
      <p>
        Using your wallet to create an `akord` object from authentication, you
        can work with your vaults and their contents to :
      </p>
      <p>Create a private vault.</p>
      <pre>
        {"const {(vaultId, membershipId)} =\n"}
        {"  await akord.vault.create('Personal Diary');"}
      </pre>
      <p>List your vaults.</p>
      <pre>{"const vaults = await akord.vault.list();"}</pre>
      <p>Sort them by name.</p>
      <pre>{"vaults.sort((a,b) => (a.name >= b.name))"}</pre>
      <p>Filter them by status</p>
      <pre>{"vaults.filter((v) => v.status === 'ACTIVE')"}</pre>
      {!state.current_user && (
        <p>
          <a href="/wallet">Login with your wallet</a> to view your vaults.
        </p>
      )}
      {state.current_user && (
        <>
          <p>Try it with your vaults:</p>
          <Dropdown
            options={options}
            onChange={onStatusChange}
            value={defaultOption}
            placeholder="Select an option"
          />

          <table className="table table-dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {vaults
                // filter by status
                .filter((v) => v.status === status)
                // sort by name
                .sort((a, b) => {
                  return a.name >= b.name;
                })
                .map((v, i) => (
                  <tr key={i}>
                    <td>
                      <Link to={`/vaults/${v.id}`}>
                        {v.id.slice(0, 4) + "..." + v.id.slice(-2)}
                      </Link>
                    </td>
                    <td>{v.name}</td>
                    <td>{v.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
      {isLoading && <div className="spinner-border  text-light"></div>}
    </>
  );
};

export default Vaults;
