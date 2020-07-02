
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {

  entry: `${__dirname}/src/index.js`,

  output: {
    path: `${__dirname}/dist`,
    filename: '[name].bundle.js',
    publicPath: '/.ui/'
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
    new HtmlPlugin({
      template: `${__dirname}/src/ui.html`,
      filename: 'ui.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public'
        }
      ]
    })
  ],

  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      // worker
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader'
        }
      },      
    ]
  }
}
