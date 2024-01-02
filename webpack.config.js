const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background_scripts: "./src/background.js",
    content_scripts: "./src/content_scripts.js",
    popup: "./src/popup.js"
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public' }
      ]
    })
  ]
};
