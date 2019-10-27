import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Jarvis from 'webpack-jarvis';
import webpack from 'webpack';
import paths from './paths';

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: paths.outputPath,
    chunkFilename: '[name].js'
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 20000000,
    maxEntrypointSize: 8500000,
    assetFilter: assetFilename => {
      return (
        assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
      );
    }
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules|stylesheet[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    contentBase: paths.outputPath,
    historyApiFallback: true,
    compress: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.templatePath,
      inject: true,
      hash: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Jarvis({
      port: 1337
    })
  ]
};
