import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import paths from './paths';

module.exports = {
  mode: 'production',
  output: {
    filename: `[name].[chunkhash].js`,
    path: paths.outputPath,
    chunkFilename: '[name].[chunkhash].js'
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
    },
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.templatePath,
      inject: true,
      hash: false,
      minify: {
        collapseInlineTagWhitespace: false,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyURLs: false,
        removeComments: true,
        removeAttributeQuotes: false
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].css'
    }),
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$/,
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  devtool: 'source-map'
};
