# React Universal Starter Kit

Quick start react package.

## Features

* Babel 6, ES2015 + ES7
* Webpack, development and production
* React 0.14, react-router
* HMR, reloading page through
* Jest, Enzyme for unit testing
* Airbnb config eslint
* Sass like css loaders
* MaterialUI to provide better UI

## Installation

```sh
git clone https://github.com/Beingbook/react-isomorphic-starter-kit.git
cd react-isomorphic-starter-kit
npm i # alias to install
```

### About postinstall

`postinstall` command in `package.json` will be executed after `npm install`.
I added that command to deploy on Heroku.
If you don't want to use it, no matter to detach that command.

## Usage

### Custom Scripts

These scripts are useful to

#### Development

```sh
npm run dev
```

It will open a browser window.
In development environment, [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) could be happened.
Don't worry. FOUC is not in production environment.

#### Build

```sh
npm run build
```

It will build package for production.

#### Lint

```sh
npm run lint
```

It will eslint this package.

#### Test

```sh
npm test
npm test -- --watch
```

It will eslint and unit test.

#### Deployment

```sh
npm run deploy
```

You should edit `./tools/tasks/deploy.js` file before use this command.

### Directory Map

```sh
tree -L 2 -I 'node_modules|build'
.
├── README.md         # what you are reading
├── jest              # jest configurations
│ └── preprocessor.js # to enable es6 features, use custom preprocessor
├── package.json      # node package file
├── src               # where you will work
│ ├── api             # server
│ ├── assets          # contents here will be maintained when builded
│ ├── client.jsx      # client entry
│ ├── components      # react components
│ ├── config.js       # custom configurations
│ ├── lib             # custom libraries
│ ├── public          # static assets
│ ├── routes          # route configurations
│ └── server.jsx      # server entry
└── tools             # build or manage scripts
    ├── config.js     # webpack, path etc...
    ├── deploy.sh     # deploy command
    ├── lib           # task libraries
    ├── run.js        # file to run a task
    └── tasks         # sub tasks
```
