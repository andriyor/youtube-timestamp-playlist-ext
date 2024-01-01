const path = require("path");

module.exports = {
  entry: {
    background_scripts: "./background_scripts/background.js",
    content_scripts: "./content_scripts/beastify.js",
    popup: "./popup/popup.js"
  },
  output: {
    path: path.resolve(__dirname, "addon"),
    filename: "[name]/index.build.js"
  },
  mode: 'none',
};
