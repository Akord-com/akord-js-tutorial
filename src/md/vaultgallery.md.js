import { mdFix } from "../helpers/helper.js";

const vaultgallery_md = mdFix(`

# Vault Gallery

If your vault contains photos, we'll download them here and display them in a gallery.

'''
const { data: file } = 
    await akord.stack.getVersion(stack.id);

const fileUrl = 
    URL.createObjectURL(new Blob([file]));

<img src={fileUrl} />
'''
`);

export default vaultgallery_md;
