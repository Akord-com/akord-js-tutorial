const path = require("path");
module.exports = {
  webpack: {
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      "@mui/material": path.resolve(__dirname, "./node_modules/@mui/material")
    },
    configure: webpackConfig => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === "ModuleScopePlugin"
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
        if (rule.oneOf instanceof Array) {
          rule.oneOf[rule.oneOf.length - 1].exclude = [
            /\.(js|mjs|jsx|cjs|ts|tsx)$/,
            /\.html$/,
            /\.json$/
          ];
        }
        return rule;
      });
      return webpackConfig;
    }
  }
};
