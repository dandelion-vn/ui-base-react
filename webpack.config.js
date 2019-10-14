const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");

const devServer = {
  port: 3000,
  open: false,
  disableHostCheck: true,
  historyApiFallback: true,
  overlay: true,
  stats: "minimal",
  inline: true,
  compress: true,
  contentBase: "/"
};

module.exports = {
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules|style[\\/]/,
          name: "vendor",
          chunks: "all"
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
    new webpack.DefinePlugin({
      "process.env.REACT_APP_STAGE": JSON.stringify("production")
    }),

    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$/,
      filename: "[path].gz[query]",
      algorithm: "gzip",
      threshold: 10240,
      minRatio: 0.8
    }),

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new webpack.NoEmitOnErrorsPlugin(),

    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].bundle.css",
      chunkFilename: "[name].[chunkhash].bundle.css"
    }),

    // new webpack.ProvidePlugin({
    //     $: "jquery",
    //     jQuery: "jquery",
    //     "window.$": "jquery",
    //     "window.jQuery": "jquery"
    // }),

    new HtmlWebpackPlugin({
      inject: true,
      hash: false,
      template: "./src/index.html",
      //   favicon: "./src/asset/favicon/fav.ico",
      filename: "index.html",
      minify: {
        collapseWhitespace: true
      }
    })
  ],

  devtool: "source-map",

  entry: {
    main: "./src/index.js"
  },

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].[chunkhash].bundle.js",
    chunkFilename: "[name].[chunkhash].bundle.js"
  },

  resolve: {
    extensions: ["*", ".ts", ".tsx", ".js", ".jsx"],
    modules: [path.resolve("./"), path.resolve("./node_modules")],
    alias: {
      "@src": path.resolve(__dirname, "src")
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        use: ["cache-loader", "babel-loader"]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: "/node_modules/",
        use: ["ts-loader", "babel-loader"]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /(style|node_modules)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[local]_[hash:base64:7]",
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              module: true,
              localIdentName: "[local]_[hash:base64:7]",
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: /(style|node_modules)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              module: false,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico|mp3|mp4|woff|woff2|eot|ttf|svg)$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[sha512:hash:base64:7].[ext]"
            }
          }
        ]
      }
    ]
  },

  performance: {
    maxEntrypointSize: 3000000,
    maxAssetSize: 3000000
  },

  devServer
};
