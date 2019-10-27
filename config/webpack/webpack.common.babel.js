import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpack from 'webpack';
import paths from './paths';
import rules from './rules';

module.exports = {
  entry: {
    main: paths.entryPath
  },
  module: {
    rules
  },
  resolve: {
    alias: {
      '@src': paths.sourceFolder
    },
    extensions: ['*', '.js', '.jsx', '.scss', '.css']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin()
  ]
};
