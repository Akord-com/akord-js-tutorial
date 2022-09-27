const Home = () => {
  return (
    <>
      <h1 className="card-title mb-3">Akord-js Tutorial</h1>
      <p>
        This tutorial is designed to introduce Akord Vaults, a solution for user
        owned storaged.
      </p>
      <h3>What is user owned storage?</h3>
      <p>
        Akord Vaults are private, permanent and composable storage units for
        web3, SaaS and enterprise environments. They give the user control of
        their data, by allowing them to choose which apps and/or people have
        access. Access control is managed by decentralized protocols and
        cryptography.
      </p>
      <img
        src="/images/user-owned-storage.png"
        className="float-end m-3"
        style={{ maxHeight: "25em" }}
        alt="data flow chart"
      />
      <ul>
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
        Vaults provide the means for users to own their own data, for them to
        have the right to consent of that data and portability outside of the
        applications that use it.
      </p>
      <p>
        In the web3 paradigm, vaults are owned by the user and dApps
        (decentralized applications) request permission to access it, in the
        same way they do for interacting with blockchain transactions.
      </p>
      <h3>Akord-Js and React</h3>
      <p>
        In this React app, we'll cover the basics for how to create, contribute
        to and access an Akord Vault.
      </p>
      <ul>
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
      <h5>Installation</h5>
      <p>This tutorial requires packages from :</p>
      <ul>
        <li>
          <b>@akord/akord-js</b> : official package from Akord enabling access
          to the Akord API and Smartweave transactions.
        </li>
        <li>
          <b>warp-contracts</b> : Smartweave implementation by the RedStone
          team. Warp contracts offers caching and distribution services.
        </li>
      </ul>
      <pre>npm install @akord/akord-js warp-contracts</pre>
      <div className="alert alert-warning">
        <h5>NOTE: Using akord-js with React</h5>
        <p>
          Using @akord/akord-js requires libraries that may trigger an error
          related to not finding the 'crypto' or 'constrants' modules.
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
