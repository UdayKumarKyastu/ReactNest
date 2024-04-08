const path = require('path')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlWebpackTemplate = require('html-webpack-template')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => ({
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '.dist'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/',
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  devtool: env.production ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.png|svg|jpg|gif|csv$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    symlinks: false,
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'global.css',
    }),
    new HtmlWebpackPlugin({
      title: 'Pret Portal',
      template: htmlWebpackTemplate,
      meta: [{ name: 'viewport', content: 'width=DEVICE-width, initial-scale=1.0' }],
      bodyHtmlSnippet: '<div id="app"></div>',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          filename: 'vendors.[contenthash].js',
          chunks: 'all',
        },
      },
    },
  },
})
