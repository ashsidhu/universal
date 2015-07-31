var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);

// Object containing all node modules 
// for excluding dependencies in server side builds
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  resolve: {
    extensions: ['', '.ts', '.js']
  },

  entry: './modules/server/server',

  output: {
    path: root('__build__'),
    filename: 'server_build.js'
  },

  node: {
    fs: 'empty'
  },

  externals: nodeModules,

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'typescript-simple-loader'
      }
    ]
  }

}


function root(args) {
  args = sliceArgs(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}