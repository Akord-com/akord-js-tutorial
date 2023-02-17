# Vaults

Akord Protocol stores your data in private or public, permanent, user owned storage units called 'Vaults'.

Using your wallet to create an `akord` object from authentication, you can work with your vaults and their contents to :

Create a private vault.

```
const {(vaultId, membershipId)} = await akord.vault.create('Personal Diary');
```

List your vaults.

```
const vaults = await akord.vault.list();
```

Sort them by name.

```
vaults.sort((a,b) => (a.name >= b.name));
```

Filter them by status

```
vaults.filter((v) => v.status === 'ACTIVE');
```
