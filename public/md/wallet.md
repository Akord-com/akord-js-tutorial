# Wallets

Akord Wallets are used to store and access the user's keys across
devices. The wallet is secured by a 12 word 'recovery phrase' and accessible via
a username and password.

```
import { Akord } from "@akord/akord-js";

// from username password
const { akord, jwt, wallet } = await Akord.auth.signIn(email, pass);

// ... or from wallet and jwt
const akord = Akord.init(wallet, jwt);

```
