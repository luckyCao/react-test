var webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    path = require('path'),
    ip = require('ip'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ROOT_PATH = path.resolve(__dirname),
    APP_PATH = path.resolve(ROOT_PATH, 'src'),
    TransferWebpackPlugin = require('transfer-webpack-plugin');


module.exports = {
    entry:{
      client: 'webpack-hot-middleware/client',
      pageA: path.resolve(__dirname, 'src/pageA.js'),
      pageB: path.resolve(__dirname, 'src/pageB.js'),
      shared: [
        'babel-polyfill'
      ]
    },
    output: {
        path: path.join(__dirname, '/build/'),
        filename: 'build/[name].[hash:4].js',
        chunkFilename: 'build/chunk.[id].[hash:4].js',
        publicPath: '/'
    },
    module: {
        loaders: [ {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loaders: ['babel?optional=runtime&stage=0']
        }]
    },
    resolve: {
        modulesDirectories: [
            'src',
            'node_modules',
        ],
        extensions: ['', '.js', '.png']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/pageA.tpl.html',
        chunks: ['shared','pageA'],
        inject: 'body',
        filename: 'pageA.html'
      }),
      new HtmlWebpackPlugin({
        template: 'src/pageB.tpl.html',
        chunks: ['shared','pageB'],
        inject: 'body',
        filename: 'pageB.html'
      }),
        new TransferWebpackPlugin([
            { from: 'lib', to: 'build'}
        ], path.join(__dirname, 'src')),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1.5,
            moveToParents: true
        }),
        new webpack.DefinePlugin({
            'process.env.BROWSER': JSON.stringify(true)
        })
    ],
    devtool: 'source-map'
};