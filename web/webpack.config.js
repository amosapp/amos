const R = require(`ramda`)
const BundleAnalyzerPlugin = require(`webpack-bundle-analyzer`).BundleAnalyzerPlugin
const CopyPlugin = require(`copy-webpack-plugin`)
const DynamicCdnWebpackPlugin = require(`dynamic-cdn-webpack-plugin`)
const HtmlWebPackPlugin = require(`html-webpack-plugin`)
const SpritePlugin = require(`svg-sprite-loader/plugin`)
const ErrorOverlayPlugin = require(`error-overlay-webpack-plugin`)
const cdnResolvers = require(`./cdn-resolvers`)
const path = require(`path`)

const rootPath = dir => path.resolve(__dirname, dir)

const common = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: `babel-loader`,
    }, {
      test: /\.(png|jpe?g|gif)$/,
      exclude: /node_modules/,
      use: [{
        loader: `file-loader`,
        options: {name: `[hash].[ext]`},
      }],
    }, {
      test: /\.svg$/,
      use: [{
        loader: `svg-sprite-loader`,
        options: {extract: true},
      }, `svgo-loader`]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
    ]
  },
  output: {
    filename: `[hash].js`,
    publicPath: `/`,
    path: rootPath (`dist`),
  },
  resolve: {
    alias: {
      common: rootPath(`src/common/common.js`),
      components: rootPath(`src/components`),
      apollo: rootPath(`src/apollo`),
      repoCommon: rootPath (`../common`)
    }
  },
  plugins: [
    new SpritePlugin(),
    new HtmlWebPackPlugin({
      template: rootPath(`src/index.html`)
    }),
    new CopyPlugin([{
      from: rootPath(`public`)
    }]),
  ],
}

const develop = {
  mode: `development`,
  devtool: `cheap-module-source-map`,
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new ErrorOverlayPlugin(),
  ],
}

const production = {
  mode: `production`,
  plugins: [
    new DynamicCdnWebpackPlugin({
      env: `production`,
      resolver: cdnResolvers
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: `static`,
      reportFilename: rootPath (`bundle-report.html`)
    }),
  ],
}

const makeConfigs = R.mergeDeepWith (R.concat, common)

console.log (`Running webpack with process.env.NODE_ENV ${process.env.NODE_ENV}.`)

const config = (
  process.env.NODE_ENV === `production`
    ? makeConfigs(production)
    : makeConfigs(develop)
)

module.exports = config