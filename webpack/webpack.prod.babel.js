import webpack from 'webpack';
import merge from 'webpack-merge';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import common from './webpack.common.babel';

export default merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      cache: false,
      parallel: true,
      uglifyOptions: {
        compress: true,
        mangle: true
      },
      sourceMap: true,
      extractComments: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
});
