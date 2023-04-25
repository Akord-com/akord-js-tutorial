import { mdFix } from "../helpers/helper.js";

const diary_md = mdFix(`
# Diary
Post and read from your encrypted, user owned vault.

In our example, we'll first check for a vault called 'VAULT_TITLE', create one if not found and post diary entries to it.

'''
const vaults = await akord.vault.listAll();

const VAULT_TITLE = "My Vault Diary";
const vault = vaults.filter(
    (v) => v.name === VAULT_TITLE
);

var vId = null;
if (vault.length != 0) {
    vId = vault[0].id'
} else {
    const { vaultId } = 
        await akord.vault.create(VAULT_TITLE);
    vId = vaultId;
}
'''

With our VaultId in hand, each post in the diary will be stored as a 'Note'. Notes are text files using the markdown format.

'''
const name = 'A post for tuesday';
const content = 'A private & secure post.';

const note = await akord.note.create(vId, content, name);
'''

Finally, we can query the vault and download the posts.

'''
const notes = await akord.note.listAll(vId);
for (var i in notes) {
  // download the file from the note stack
  const file = await akord.note.getVersion(notes[i].id);

  // save the name/content to our posts array
  notes[i].content = file.data;
  notes[i].title = file.name;
}
'''

`);

export default diary_md;
