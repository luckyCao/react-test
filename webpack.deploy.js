var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var isProduction = process.env.DEV_ENV === 'production';

// var assetsPath = '/chaoshi/pages/unifyCashier/assets/';    //旧系统path
var assetsPath = '/assets/';    // 新系统path

var config = {
  cache: true,
  entry: {
    pageA: path.resolve(__dirname, 'src/pageA.js'),
    pageB: path.resolve(__dirname, 'src/pageB.js'),
    shared: [
      'babel-polyfill'
    ]
  },
  output: {
    path: path.join(__dirname, '/dist' + assetsPath),
    filename: 'js/[name].[hash:4].js',
    chunkFilename: 'js/chunk.[id].[hash:4].js',
    //cdn host
    publicPath: assetsPath
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
      'src/assets'
    ],
    extensions: ['', '.json', '.js', '.png']
  },
  module: {
    loaders: [{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('css?-minimize!postcss!less')
    }, {
      test: /\.(js|jsx)?$/,
      exclude: /node_modules/,
      loaders: ['babel', 'eslint']
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.(jp?g|gif|png|woff|ico)$/,
      loaders: ['url-loader?limit=8192&name=images/[name].[hash:4].[ext]', 'img?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80"}}']
    }, {
      test: /\.(woff2?|otf|eot|ttf)$/i,
      loader: 'url?name=fonts/[name].[hash:4].[ext]'
    }]
  },
  imagemin: {
    gifsicle: {
      interlaced: false
    },
    jpegtran: {
      progressive: true,
      arithmetic: false
    },
    optipng: {
      optimizationLevel: 5
    },
    pngquant: {
      floyd: 0.5,
      speed: 2
    },
    svgo: {
      plugins: [{
        removeTitle: true
      }, {
        convertPathData: false
      }]
    }
  },
  postcss: function() {
    return [
      require('precss'),
      require('autoprefixer')
    ]
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
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: true
    }),
    new ExtractTextPlugin('css/app.css'),
    new webpack.optimize.CommonsChunkPlugin('shared', 'js/shared.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      cache: false,
      compressor: {
        warnings: false,
        screw_ie8: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.5,
      moveToParents: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEV_ENV': JSON.stringify(process.env.DEV_ENV)
    })
  ]
};
if(isProduction){
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    cache: false,
    compressor: {
      warnings: false,
      screw_ie8: false
    },
    output: {
      comments: false
    }
  }))
}
module.exports = config;
