const {resolve} = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {getIfUtils, removeEmpty} = require('webpack-config-utils');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env);
  const config = {
    // context: resolve('src'),
    entry: {
      main: './index.js'
    },
    output: {
      filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js'),
      path: resolve('dist'),
      pathinfo: ifNotProd(),
      // publicPath: '/assets/'
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader",
          exclude: /node_modules/,
          // include: APP_ROOT
        },{
          test: /\.css/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },{
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'less-loader'
            ]
          })
        },{
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'sass-loader'
            ]
          })
        },{
          test: /\.(png|jpg|ttf|woff|woff2|eot)$/,
          use: 'url-loader?limit=8192'
        },
        {
          test: /\.svg$/,
          use: 'svg-loader'
        },{
          test: /\.json/,
          use: 'json-loader'
        }]
    },
    plugins: removeEmpty([
      new webpack.DefinePlugin({
        __LORE_ROOT__: JSON.stringify(__dirname)
      }),
      new ProgressBarPlugin(),
      new ExtractTextPlugin(ifProd(
        'styles.[name].[chunkhash].css',
        'styles.[name].css'
      )),
      ifProd(new ManifestPlugin({
        fileName: 'asset-manifest.json'
      })),
      // ifProd(new webpack.optimize.CommonsChunkPlugin({
      //   names: ['manifest'],
      // })),
      ifProd(new CopyWebpackPlugin([{
        from: 'assets/images',
        to: 'assets/images'
      }])),
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body',
      }),
    ]),
  };
  if (env.debug) {
    console.log(config);
    debugger;
  }
  return config;
};
