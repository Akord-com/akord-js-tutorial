import { mdFix } from "../helpers/helper.js";

const wallet = mdFix(`
# Wallets

Akord Wallets are used to store and access the user's keys across
devices. The wallet is secured by a 12 word 'recovery phrase' and accessible via
a username and password.

The wallet is stored in the user account encrypted. If you loose your password, Akord cannot recover your wallet.  You will therefore need your recovery phrase to reset the password.

Read more about encryption at [End to End Encryption](https://docs.akord.com/learn/end-to-end-encryption) in Akord docs.

'''
import { Akord } from "@akord/akord-js";

// from username password
const { akord, jwt, wallet } = await Akord.auth.signIn(email, pass);

// ... or from wallet and jwt
const akord = Akord.init(wallet, jwt);

`);

export default wallet;
