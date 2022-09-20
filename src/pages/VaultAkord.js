import React, { useState, useEffect } from "react";
import useForm from "../useForm";
import validate from "./LoginValidation";
import { signIn, currentUser } from "../helpers.js";

const VaultAkord = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      // Update the document title using the browser API
      if (!user) {
        console.log(`loading current user...`);
        const user = await currentUser();
        if (user) {
          setUser(user);
        }
      }
    }
    getUser();
  });

  if (!user) {
    return (
      <div className="row">
        <div className="col">
          <h3>Login First</h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* {loggedIn && <Redirect to="/default" />} */}
      <h3>Login to your Akord Wallet</h3>
    </div>
  );
};

export default VaultAkord;
