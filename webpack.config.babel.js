import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
})

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
}

const LAUNCHCOMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCHCOMMAND === 'production'
process.env.BABEL_ENV = LAUNCHCOMMAND

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const base = {
  entry: [
    PATHS.app,
  ],
  output: {
    path: PATHS.build,
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.css$/, loader: 'style-loader!css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'}
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './app'),
      'node_modules',
    ]
  }
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot:true,
    inline:true,
    progress:true
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HTMLWebpackPluginConfig, productionPlugin]
}

export default Object.assign({}, base, 
  isProduction === true ? productionConfig: developmentConfig)
