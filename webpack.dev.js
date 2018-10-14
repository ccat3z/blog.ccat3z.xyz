const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'js/blog.js'
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, '_site')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/blog.css'
    })
  ]
})
