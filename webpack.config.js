const path = require("path");

module.exports = {
  entry: {
    background_scripts: "./background_scripts/background.js",
    content_scripts: "./content_scripts/content_scripts.js",
    popup: "./popup/popup.js"
  },
  mode: 'none',
};
