var webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    path = require('path'),
    ip = require('ip'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ROOT_PATH = path.resolve(__dirname),
    APP_PATH = path.resolve(ROOT_PATH, 'src');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        APP_PATH
    ],
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
            filename: "index.html",
            inject: 'body',
            template: "src/index.tpl.html"
        }),
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