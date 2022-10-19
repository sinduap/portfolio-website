const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    main: './src/assets/js/main.js',
    common: './src/assets/js/common.js',
    style: './src/assets/scss/main.scss',
    dark: './src/assets/scss/themes/dark.scss',
  },

  devServer: {
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
      inject: true,
      chunks: ['main', 'common', 'style', 'dark'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/blog.html',
      inject: true,
      chunks: ['common', 'style', 'dark'],
      filename: 'blog.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  optimization: {
    runtimeChunk: 'single',
  },
}
