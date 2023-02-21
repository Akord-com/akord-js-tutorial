// in our markdown, replace ''' with ```
const mdFix = (md) => {
  return md.replace(/'''/g, "```");
};

module.exports = {
  mdFix,
};
