var argv = require('yargs').argv;
var path = require('path');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: !argv.watch,
    frameworks: ['mocha', 'chai'],
    reporters: ['spec'],
    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './src/**/*.spec.js',
    ],
    preprocessors: {
      ['./src/**/*.js*']: ['webpack', 'sourcemap'],
    },
    webpack: {
       devtool: 'inline-source-map',
       resolve: {
        root: path.resolve(__dirname, './src'),
        extensions: ['', '.js', '.jsx'],
        alias: {
          'sinon': 'sinon/pkg/sinon',
        },
      },
      module: {
        noParse: [
          /node_modules\/sinon\//
        ],
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
          }, {
            test: /\.scss$/,
            loaders: [
              'style-loader',
              'css-loader?minimize&modules&importLoaders=1&localIdentName=[hash:base64:5]!postcss-loader',
            ],
          },
        ],
      },
      externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
      },
    },
    webpackMiddleware: {
      noInfo: true,
    },
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-webpack',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-sourcemap-loader',
    ],
  });
};
