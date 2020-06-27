

module.exports = {

  entry: `${__dirname}/src/worker.js`,

  devtool: 'cheap-module-eval-source-map',  

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
