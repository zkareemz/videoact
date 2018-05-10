import common from './webpack.common.babel'
import merge from 'webpack-merge'

const config = merge(common, {
  devtool: 'inline-source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  }
})

export default config
