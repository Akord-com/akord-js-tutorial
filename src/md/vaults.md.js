import { mdFix } from "./helper.js";

const vaults_md = mdFix(`
# Vaults

Akord Protocol stores your data in [private|public], permanent, user owned storage units called 'Vaults'.

You can [create a vault using the Akord App](https://v2.akord.com/create-vault) or with code.

'''
const { vaultId, membershipId } = 
    await akord.vault.create('Personal Diary');
'''

List your vaults.

'''
const vaults = await akord.vault.list();
'''

Sort them by name.

'''
vaults.sort((a,b) => (a.name >= b.name));
'''

Filter them by status

'''
vaults.filter((v) => v.status === 'ACTIVE');
'''
`);

export default vaults_md;
