const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractWebpackPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  entry: {
    main: './src/assets/js/main.js',
    common: './src/assets/js/common.js',
    style: './src/assets/scss/main.scss',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
    assetModuleFilename: 'img/[name][ext]',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [MiniCssExtractWebpackPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(jpg|svg|png|ico|gif)$/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      chunks: ['main', 'common', 'style'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/blog.html',
      inject: 'body',
      chunks: ['common', 'style'],
      filename: 'blog.html',
    }),
    new MiniCssExtractWebpackPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
}
