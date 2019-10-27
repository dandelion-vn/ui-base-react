import MiniCssExtractPlugin from 'mini-css-extract-plugin';

module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: 'babel-loader'
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /node_modules/,
    loader: 'file-loader'
  },
  {
    test: /\.(woff|woff2)$/,
    exclude: /node_modules/,
    loader: 'url-loader?prefix=font/&limit=5000'
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: ['url-loader?limit=10000', 'img-loader']
  },
  {
    test: /\.(sa|sc|c)ss$/,
    include: /node_modules/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: false,
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          modules: false,
          sourceMap: true
        }
      }
    ]
  },
  {
    test: /\.(sa|sc|c)ss$/,
    exclude: /node_modules/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[local]_[hash:base64:7]'
          },
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          modules: {
            localIdentName: '[local]_[hash:base64:7]'
          },
          sourceMap: true
        }
      }
    ]
  }
];
