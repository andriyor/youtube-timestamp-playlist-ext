const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background_scripts: "./background_scripts/background.js",
    content_scripts: "./content_scripts/content_scripts.js",
    popup: "./popup/popup.js"
  },
  mode: 'none',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public' }
      ]
    })
  ]
};
