const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background_scripts: './src/background.ts',
    content_scripts: './src/content_scripts.tsx',
    popup: './src/popup.tsx',
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
  plugins: [
    // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
};
