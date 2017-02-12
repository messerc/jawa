var path = require('path');
var srcPath = path.join(__dirname, 'src');
var buildPath = path.join(__dirname, 'dist');

module.exports = {
  context: srcPath,
  entry: path.join(srcPath, 'js', 'client.jsx'),
  output: {
      path: buildPath,
      filename: "bundle.js"
  },
  eslint: {
    configFile: './.eslintrc'
  },
  module: {
      loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015']
            }
          },
          {
            include: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.js$/, 
            exclude: /node_modules/,
            loaders: ['eslint-loader', 'babel-loader']
          }
      ]
  },
  resolve: {
    extensions: ['', '.json', '.jsx', '.js']
  }
};