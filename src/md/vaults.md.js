import { mdFix } from "../helpers/helper.js";

const vaults_md = mdFix(`
# Vaults

Akord Protocol stores your data in [private|public], permanent, user owned storage units called 'Vaults'.

You can [create a vault using the Akord App](https://v2.akord.com/create-vault/storage) or with code.

'''
const { vaultId } =
    await akord.vault.create('Personal Diary');
'''

List your vaults.

'''
const vaults = await akord.vault.listAll();
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
