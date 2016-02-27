/* eslint vars-on-top: 0, no-var: 0 */
require('babel-register');

var argv = require('yargs').argv;
var webpackCommon = require('./tools/config').webpackCommon;

module.exports = function karmaConfig(config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: !argv.watch,
    frameworks: ['mocha', 'chai'],
    reporters: ['spec'],
    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './tests/**/*.js*',
    ],
    preprocessors: {
      './tests/**/*.js*': ['webpack', 'sourcemap'],
    },
    webpack: Object.assign({}, webpackCommon, {
      devtool: 'inline-source-map',
      resolve: Object.assign({}, webpackCommon.resolve, {
        alias: {
          sinon: 'sinon/pkg/sinon',
        },
      }),
      module: Object.assign({}, webpackCommon.module, {
        noParse: [
          /node_modules\/sinon\//,
        ],
      }),
      node: {
        fs: 'empty',
      },
      externals: {
        jsdom: 'window',
        cheerio: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
      },
    }),
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
