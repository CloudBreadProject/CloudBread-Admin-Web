import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import postcssImport from 'postcss-import';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import { merge } from 'lodash';
import { resolve } from 'path';

export const ROOT = resolve(__dirname, '../');
export const buildPath = `${ROOT}/build`;
export const buildStaticPath = `${buildPath}/public`;
export const srcPath = `${ROOT}/src`;
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
export const DEBUG = !process.argv.includes('--release');
export const VERBOSE = process.argv.includes('--verbose');
export const WATCH = process.argv.includes('--watch');
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? `'development'` : `'production'`,
  __DEV__: DEBUG,
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

const webpackCommon = {
  output: {
    publicPath: '/',
    sourcePrefix: ' ',
  },
  cache: DEBUG,
  debug: DEBUG,
  stats,
  resolve: {
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
            'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss-loader',
          ],
        } : {
          loader: ExtractTextPlugin.extract(
            'style-loader',
            'css-loader?minimize&modules&importLoaders=1&localIdentName=[hash:base64:5]!postcss-loader',
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
      ...(DEBUG ? ['webpack-hot-middleware/client'] : []),
      'babel-polyfill',
      `${srcPath}/client.jsx`,
    ],
  },
  target: 'web',
  output: {
    path: buildStaticPath,
    filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js',
  },
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  plugins: [
    ...webpackCommonPlugins,
    new AssetsPlugin({
      path: buildPath,
      filename: 'assets.json',
    }),
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
  webpackClient.module.loaders
    .filter(x => x.loader === 'babel-loader')
    .forEach(x => x.query = {
      ...x.query,
      plugins: [
        ['react-transform', {
          transforms: [{
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module'],
          }, {
            'transform': 'react-transform-catch-errors',
            'imports': ['react', 'redbox-react'],
          }],
        }],
      ],
    });
}

export const webpackServer = merge({}, webpackCommon, {
  entry: {
    server: [
      'babel-polyfill',
      `${srcPath}/server.jsx`,
    ],
  },
  output: {
    path: buildPath,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  devtool: 'source-map',
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  externals: [
    /^\.\/assets\.json$/,
    function filter(context, request, cb) {
      const isExternal = request.match(/^[@a-z][a-z\/\.\-0-9]*$/i);
      return cb(null, Boolean(isExternal));
    },
  ],
  plugins: [
    ...webpackCommonPlugins,
    new webpack.BannerPlugin(
      `require('source-map-support').install();`,
      { raw: true, entryOnly: false }
    ),
  ],
});

if (DEBUG) {
  webpackServer.module.loaders
    .filter(x => x.loaders && x.loaders[0] === 'style-loader')
    .forEach(x => {
      x.loaders.shift();
      x.loaders[0] = x.loaders[0].replace(/css-loader?/, 'css-loader/locals?');
    });
}
