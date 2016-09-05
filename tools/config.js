import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import postcssImport from 'postcss-import';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import { merge } from 'lodash';
import { resolve, join } from 'path';
import { argv } from 'yargs';

export const DEBUG = !process.argv.includes('--release');
export const VERBOSE = process.argv.includes('--verbose');
export const WATCH = process.argv.includes('--watch');

export const DEV_PORT = argv.port || 5000;
export const DEV_HOSTNAME = 'localhost';
export const DEV_HOST = `${DEV_HOSTNAME}:${DEV_PORT}`;
export const DEV_SERVER = `http://${DEV_HOST}`;

export const ROOT = resolve(__dirname, '../');  // Mac, Linux
//export const ROOT = join(__dirname, '../');  // Windows
export const buildPath = `${ROOT}/build`;
export const srcPath = `${ROOT}/src`;
export const modulePath = `${ROOT}/node_modules`;
export const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '\'development\'' : '\'production\'',
  __DEV__: DEBUG,
  __PORT__: DEV_PORT,
};
export const stats = {
  colors: true,
  reasons: DEBUG,
  hash: VERBOSE,
  version: VERBOSE,
  timings: true,
  chunks: VERBOSE,
  chunkModules: VERBOSE,
  cached: VERBOSE,
  cachedAssets: VERBOSE,
};

export const webpackCommon = {
  output: {
    publicPath: '/',
    sourcePrefix: ' ',
  },
  cache: DEBUG,
  debug: DEBUG,
  stats,
  resolve: {
    root: srcPath,
    extensions: ['', '.jsx', '.json', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0', 'stage-1', 'stage-2', 'stage-3'],
        },
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.scss$/,
        ...(DEBUG ? {
          loaders: [
            'style-loader',
            'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', // eslint-disable-line
            'postcss-loader',
          ],
        } : {
          loader: ExtractTextPlugin.extract(
            'style-loader',
            'css-loader?minimize&modules&importLoaders=1&localIdentName=[hash:base64:5]!postcss-loader' // eslint-disable-line
          ),
        }),
      }, {
        test: /\.txt$/,
        loader: 'raw-loader',
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      },
    ],
  },
  postcss(bundler) {
    return [
      postcssImport({
        addDependencyTo: bundler,
        path: [
          srcPath,
        ],
      }),
      precss(),
      autoprefixer({
        browsers: AUTOPREFIXER_BROWSERS,
      }),
    ];
  },
};

export const webpackCommonPlugins = [
  new webpack.DefinePlugin(GLOBALS),
  new webpack.optimize.OccurenceOrderPlugin(),
  ...(DEBUG ? [
    // development
  ] : [
    // productions
    new ExtractTextPlugin('style.css', {
      allChunks: true,
    }),
  ]),
];

export const webpackClient = merge({}, webpackCommon, {
  entry: {
    app: [
      ...(DEBUG ? [
        `webpack-dev-server/client?${DEV_SERVER}`,
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
      ] : []),
      'babel-polyfill',
      `${srcPath}/client.jsx`,
    ],
  },
  target: 'web',
  output: {
    path: buildPath,
    filename: '[name].js',
  },
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  plugins: [
    ...webpackCommonPlugins,
    ...(DEBUG ? [
      // development
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: VERBOSE,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
    ]),
  ],
});

if (DEBUG) {
  // displays pretty errors when occurs
  webpackClient.module.loaders
    .filter(x => x.loader === 'babel-loader')
    .forEach(x => x.query = { // eslint-disable-line
      ...x.query,
      plugins: [
        ['react-transform', {
          transforms: [{
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module'],
          }, {
            transform: 'react-transform-catch-errors',
            imports: ['react', 'redbox-react'],
          }],
        }],
      ],
    });
}
