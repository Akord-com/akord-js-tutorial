import { mdFix } from "./helper.js";

const vaultgallery_md = mdFix(`

# Vault Gallery

From your stack, you will need to download and decrypt the associated file. For example, below we download the file and display it as an image in the browser.

'''
const { data: file } = await akord.file.get(stack.id);
const fileUrl = URL.createObjectURL(new Blob([file]));

<img src={fileUrl} />
'''
`);

export default vaultgallery_md;
