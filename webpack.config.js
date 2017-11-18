/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var GenerateAssetPlugin = require('generate-asset-webpack-plugin');

var background = {
  entry: {
    background: path.resolve('src', 'background.js')
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      src: path.resolve('src')
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  }
};

var content = {
  entry: {
    content: path.resolve('src', 'content.js'),
    options: path.resolve('src', 'options.js')
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json'],
    alias: {
      'vue': 'vue/dist/vue.js',
      'src': path.resolve('src')
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        loader: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1,
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1,
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(html|htm)(\?.*)?$/,
        loader: 'html-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['vue-style-loader', 'css-loader'],
            scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
            sass: ['vue-style-loader', 'css-loader', 'sass-loader']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '`production`'
      }
    }),
    new GenerateAssetPlugin({
      filename: 'manifest.json',
      fn: (compilation, cb) => {
        let package = require(path.resolve('package.json'));
        let manifest = require(path.resolve('src', 'manifest.json'));
        manifest.version = package.version;
        if (process.env.npm_config_webext == 'chrome') {
          delete manifest.applications;
        }
        cb(null, JSON.stringify(manifest, null, 2));
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, 'node_modules')) === 0);
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve('src', 'options.html')
      },
      {
        from: path.resolve('src', 'icons'),
        to: path.resolve('dist', 'icons')
      },
      {
        from: path.resolve('src', 'images'),
        to: path.resolve('dist', 'images')
      }
    ])
  ]
};

module.exports = function(env = ''){
  return [background, content];
}