import { mdFix } from "./helper.js";

const vaultsview_md = mdFix(`
# Vault Contents

Using the primative types included in the protocol, you can store, update and manage data in your vaults.

### Folders

Group the contents of your vault into folders. Folder can keep subfolders.

'''
const { folderId } = await akord.folder.create(vaultId, "My Photos");
const folders = await akord.folder.listAll(vaultId);
'''

### Stacks

Stacks are useful contains for files. A stack keeps track of each revision of the file and provides an audit trail of all changes. Stacks can be contained in folders.  Stacks works with [FileLike](https://github.com/Akord-com/akord-js/blob/ab9bb814fa9cf73d9ed01052738c8b84a86040b2/src/types/file.ts#L8) which wraps File or NodeJs.File.

'''
const { stackId } =
    await akord.stack.create(vaultId, file, 'My Logo.png');

const decryptedFile =
    await akord.stack.getFile(stackId);
'''

From your stack, you will need to download and decrypt the associated file. For example, below we download the file and display it as an image in the browser.

'''
const { data: file } = await akord.file.get(stack.id);
const fileUrl = URL.createObjectURL(new Blob([file]));

<img src={fileUrl} />
'''

### Notes

Notes are simple markdown files and used to store plain text in your vaults. Notes can be contained in folders. Notes are built on top of the Stack primitive.

'''
const note = await akord.note.create("# Hello world");
const notes = await akord.note.listAll(vaultId);
'''

### Memos

Memos are simple and short messages that can be stored in folders and or associated with an existing node (stack, note, etc);

'''
const { memoId } = await akord.memo.create(vaultId, "gm folks!");
const memos = await akord.memo.listAll(vaultId);
'''

You can even react to a memo.

'''
// valid values:
// [JOY, ASTONISHED, CRY, HEART, FIRE, THUMBS_UP, THUMBS_DOWN, PRAY]
const { transactionId } =
    await akord.memo.addReaction(memoId, Akord.reactionEmoji.FIRE);
'''
`);

export default vaultsview_md;
