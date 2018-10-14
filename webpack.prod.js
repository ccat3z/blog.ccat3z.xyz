const path = require('path')
const find = require('find')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const getModuleVersion = (module) => require(`${module}/package.json`).version

module.exports = merge.smart(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /vuetify\/dist\/vuetify\.min\.css$/,
        use: [ 'ignore-loader' ]
      },
      {
        test: /material-design-icons\/iconfont\/material-icons.css$/,
        use: [ 'ignore-loader' ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '_site'),
      to: './',
      ignore: [ '*.html' ]
    }]),
    new MiniCssExtractPlugin({
      filename: 'css/blog.[hash].css'
    })
  ].concat(
    find.fileSync(/.*\.html$/, path.resolve(__dirname, '_site'))
      .map((f) => (new HtmlWebpackPlugin({
        filename: f.replace(path.resolve(__dirname, '_site') + '/', ''), template: f
      })))
  ).concat([
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'material-design-icons',
          entry: [
            `https://cdn.bootcss.com/material-design-icons/${getModuleVersion('material-design-icons')}/iconfont/material-icons.css`
          ]
        },
        {
          module: 'jquery',
          entry: `https://cdn.jsdelivr.net/npm/jquery@${getModuleVersion('jquery')}/dist/jquery.min.js`,
          global: 'jQuery'
        },
        {
          module: 'vue',
          entry: `https://cdn.jsdelivr.net/npm/vue@${getModuleVersion('vue')}/dist/vue.runtime.min.js`,
          global: 'Vue'
        },
        {
          module: 'vuetify',
          entry: [
            `https://cdn.jsdelivr.net/npm/vuetify@${getModuleVersion('vuetify')}/dist/vuetify.min.js`,
            `https://cdn.jsdelivr.net/npm/vuetify@${getModuleVersion('vuetify')}/dist/vuetify.min.css`
          ],
          global: 'Vuetify'
        },
        {
          module: 'velocity-animate',
          entry: [
            `https://cdn.jsdelivr.net/npm/velocity-animate@${getModuleVersion('velocity-animate')}/velocity.min.js`
          ],
          global: 'jQuery'
        }
      ]
    })
  ])
})
