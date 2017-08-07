module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname + '/client-bundle',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
