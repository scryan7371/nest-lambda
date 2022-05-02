const path = require('path')
const slsw = require('serverless-webpack')
const isLocal = slsw.lib.webpack.isLocal
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: isLocal ? 'development' : 'production',
  devtool: isLocal ? 'eval' : 'source-map',
  entry: slsw.lib.entries,
  target: 'node',
  resolve: {
    extensions: ['.mjs', '.cjs', '.ts', '.js', '.json']
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  externals: [
    nodeExternals(),
    // Possible drivers for knex - we'll ignore them
    'sqlite3',
    '@vscode/sqlite3',
    'better-sqlite3',
    'mysql2',
    'mariasql',
    'tedious',
    'mysql',
    'oracle',
    'pg-native',
    'strong-oracle',
    'oracledb',
    'pg-query-stream',
    'formidable'
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  }
}
