const home = `
# Building with Akord Vaults

In this working tutorial and demo, we will show how a developer can
integrate user owned storage into their dApps, SaaS or Enterprise
applications.

### What is user owned storage?

Akord Vaults provides users with their own private, permanent and
composable storage units. They can store their documents and media in
them. Or, applications can be granted access to their vaults to get or
save data related to the application.

Vault owners can consent to other applications having access OR they can
grant access to new members in the vault. The owner can choose if the
members are contributors or viewers.

![alt text](/images/user-owned-storage.png "Title")

User Owned Storage is different than traditional cloud architecture
because the vault is only decrypted/opened within the user's session,
not from the backend.

### Akord Vaults

Vaults are portable between dApps, Saas and Enterprise Applications.
Vaults offer a unique set of properties:

- **Private by design** AkordJS handles all end to end encryption,
  while making sure data is encrypted during tranmission, processing and
  storage.
- **Permanence** by blockchain. Arweave provides a pay up front model
  for storage. Akord Protocol, all data and all logic is verified on
  Arweave.

- **Composable** by protocol. The Akord Protocol arranges how members
  can save, exchange and process private data. The protocol is designed
  for developers to extend.

Akord Vaults provide the means for users to own their own data, for them
to have the right to consent of that data and portability outside of the
applications that interact with it.

### Tutorials

In this tutorial app, we'll cover the basics for how to build and deploy Akord vaults in your React application.

- **_Wallet_** : Access your encrypted Akord wallet, private keys and recovery phrase
- **_Vaults_** : Access your wallet's vaults and their contents
- **_Diary_** : Example application of a permanent & private personal diary.

### Creating an Akord Wallet

This tutorial currently supports the Akord Wallet, an encrypted, deterministic hierarchical wallet that is used to generate the keys for your vaults.

You can signup and create a wallet and account at [v2.akord.com](http://v2.akord.com)

### Bootstrapping your Project

The quickest way to configure React for AkordJs is to clone the [akordjs-bootstrap](https://github.com/Akord-com/akordjs-bootstrap) template.

Included in the template are dependencies needed to access cryptographic functions in the browser.

- @akord/akord-js ^3.5.0
- @craco/craco ^6.4.5
- react-scripts 4.0.3

### LFG

Ok, you're ready, lets go! 🚀
`;

export default home;
