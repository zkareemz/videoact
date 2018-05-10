const plugins = []


const config = {
  entry: {
    bundle: './example/index.js'
  },
  output: {
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './example',
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          'babel-loader',
          'source-map-loader',
        ],
      },
    ]

  },
  plugins,
}

export default config