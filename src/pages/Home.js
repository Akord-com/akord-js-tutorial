const Home = () => {
  return (
    <>
      <h1 className="card-title mb-3">Building with Akord Vaults</h1>
      <p>
        In this working tutorial and demo, we will show how a developer can
        integrate user owned storage into their dApps, SaaS or Enterprise
        applications.
      </p>
      <h3>What is user owned storage?</h3>
      <p>
        Akord Vaults provides users with their own private, permanent and
        composable storage units. They can store their documents and media in
        them. Or, applications can be granted access to their vaults to get or
        save data related to the application.
      </p>
      <p>
        Vault owners can consent to other applications having access OR they can
        grant access to new members in the vault. The owner can choose if the
        members are contributors or viewers.
      </p>
      <p className="text-center p-3">
        <img
          src="/images/user-owned-storage.png"
          className="diagram"
          alt="user owned storage"
        />
      </p>
      <p>
        User Owned Storage is different than traditional cloud architecture
        because the vault is only decrypted/opened within the user's session,
        not from the backend.
      </p>
      <h3>Akord Vaults</h3>
      <p>
        Vaults are portable between dApps, Saas and Enterprise Applications.
        Vaults offer a unique set of properties:
      </p>
      <ul className="lists">
        <li>
          <b>Private</b> by design. AkordJS handles all end to end encryption,
          while making sure data is encrypted during tranmission, processing and
          storage.
        </li>
        <li>
          <b>Permanence</b> by blockchain. Arweave provides a pay up front model
          for storage. Akord Protocol, all data and all logic is verified on
          Arweave.
        </li>
        <li>
          <b>Composable</b> by protocol. The Akord Protocol arranges how members
          can save, exchange and process private data. The protocol is designed
          for developers to extend.
        </li>
      </ul>
      <p>
        Akord Vaults provide the means for users to own their own data, for them
        to have the right to consent of that data and portability outside of the
        applications that interact with it.
      </p>
      <h3>Akord JS and React</h3>
      <p>
        In this React app, we'll cover the basics for how to create, contribute
        to and access an Akord Vault.
      </p>
      <ul className="lists">
        <li>
          <b>Wallet</b> : Demonstration of how to access your Akord wallet.
        </li>
        <li>
          <b>Vault Gallery</b> : How to access a public vault and display a
          photo gallery.
        </li>
        <li>
          <b>Vault Diary</b> : how to build a private/permanent diary.
        </li>
      </ul>
      <h3>Installation</h3>
      <p>This tutorial requires :</p>
      <ul className="lists">
        <li>
          <b>@akord/akord-js</b> : official package from Akord enabling access
          to the Akord API and Smartweave transactions.
        </li>
      </ul>
      <pre>npm install @akord/akord-js</pre>
      <div className="alert-highlight">
        <h2>NOTE: Using akord-js with React</h2>
        <p>
          Using @akord/akord-js requires libraries that may trigger an error
          related to not finding the 'crypto' or 'constants' modules.
        </p>
        <p>
          To fix the problem, reference the following in your package.json :
        </p>
        <pre className="">
          {`"dependencies": {`}
          <br />
          {`  "react-scripts": "4.0.3",`}
          <br />
          {`...`}
          <br />
          {`}`}
          <br />
        </pre>
      </div>
    </>
  );
};

export default Home;
