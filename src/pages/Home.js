const Home = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">AkordJS Tutorial</h2>
      </div>
      <div className="card-body">
        <p>
          Akord Vaults are private, permaneant and composable storage units for
          web3 environments. They give the user control of their data, allowing
          them to choose which apps and/or people have access.
        </p>
        <p>
          Vaults provide the means for users to own their own data, for them to
          consent to who can see/access their data and portability of thier data
          outside of the applications that use it.
        </p>
        <p>
          In this React app, we'll cover the basics for how to create,
          contribute to and access an Akord Vault.
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
      </div>
      <div className="card-body">
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
      </div>
    </div>
  );
};

export default Home;
