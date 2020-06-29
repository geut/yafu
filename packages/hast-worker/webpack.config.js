

module.exports = {

  entry: `${__dirname}/src/worker.js`,

  output: {
    path: `${__dirname}/dist`,
    filename: 'hast.worker.js'
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
