

module.exports = {

  entry: {
    hast: `${__dirname}/src/hast.js`,
  },

  output: {
    path: `${__dirname}/dist`,
    filename: '[name].worker.js'
  },

  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
