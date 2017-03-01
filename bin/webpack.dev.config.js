var webpack = require('webpack');
var path = require('path');
var getEntry = require('./getEntry.js');
var alias = require('../app/plugin_alias.js');
var containerPath = path.resolve('./');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSASS = new ExtractTextPlugin('[name].css');

// 获取所有js入口
var entrys = getEntry('./app/src/*/*.js');
// 获取所有页面
var pages = getEntry('./app/src/*/*.pug');

// webpack处理的插件
var plugins = [];
plugins.push(extractSASS);
// HMR 模块
plugins.push(new webpack.HotModuleReplacementPlugin());

// 处理pug页面
for (var chunkname in pages) {
  var conf = {
    filename: chunkname + '.html',
    template: pages[chunkname],
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    chunks: ['commons',chunkname],
    hash: true
  }
  plugins.push(new HtmlWebpackPlugin(conf));
}

var commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'commons', // 这公共代码的chunk名为'commons'
  filename: '[name].bundle.js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
  // minChunks: 4, // 设定要有4个chunk（即4个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
});

plugins.push(commonsChunkPlugin);



function getFileName(name) {
  var arr = name.split('\/');
  return arr[arr.length - 1] + '.js';
}

// entrys['vendor'] = ['avalon2', 'js-cookie'];
//
// plugins.push(new webpack.optimize.CommonsChunkPlugin({
//   names: ['vendor', 'manifest'],
// }));

/**
 * 配置webpack
 */
var config = {
  entry: entrys,
  output: {
    path: path.resolve(containerPath, './app/src/'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        'babel-loader', 'eslint-loader'
      ],
      exclude: /(node_modules)|(plugins)/
    }, {
      test: /\.html$/,
      use: 'raw-loader'
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader'
      }),
      exclude: /(node_modules)|(plugins)/
    }, {
      test: /\.css$/,
      use: extractSASS.extract(['css'])
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: ['file-loader']
    }, {
      test: /.pug$/,
      use: ['pug-loader'],
      exclude: /(node_modules)|(plugins)/
    }, {
      test: /\.(png|jpg|gif)$/,
      use: ['url-loader?limit=8192&name=img/[name].[ext]?[hash:8]']
    }]
  },
  plugins: plugins,
  resolve: {
    alias: alias,
    extensions: [
      '.js',
      '.css',
      '.scss',
      '.pug',
      '.png',
      '.jpg'
    ]
  },
  externals: {},
  target: 'web'
};
module.exports = config;
