const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background_scripts: "./src/background.js",
    content_scripts: "./src/content_scripts.js",
    popup: "./src/popup.js"
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
