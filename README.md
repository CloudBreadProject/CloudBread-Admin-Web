# React Universal Starter Kit

Quick start react package. See [this live](http://react-isomorphic.herokuapp.com/)

## Features

* Babel 6, ES2015 + ES7
* Webpack, development and production
* React 0.14.x, react-router
* HMR, reloading page through
* Jest, Enzyme for unit testing (will be changed to Mocha with Krama)
* Airbnb config eslint
* Sass like css loaders
* MaterialUI to provide better UI

## Installation

```sh
git clone https://github.com/Beingbook/react-isomorphic-starter-kit.git
cd react-isomorphic-starter-kit
npm i # alias to install
```

## Usage

### Custom Scripts

#### Development

```sh
npm start
npm start -- --port=8080 # if you want to change the port
```

It will open a browser window.
In development environment, [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) could be happened.
Don't worry. FOUC is not in production environment.
Never use this command for production directly because this command will be executed via `babel-node` which makes performance slower.
To serve production application, you have to deploy or build it and execute `npm start` in the build folder.

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

#### CSS Comb

```sh
npm run csscomb
```

Make your css code beautiful.

#### Deployment

You should edit `./tools/tasks/deploy.js` file before use this command.

```sh
npm run deploy
```

Basically this script deploys this package on git repository after build.
GitHub, Heroku, Azure, AWS, AppEngine doesn't matter, perhaps.

### Directory Map

```sh
tree -L 2 -I 'node_modules|build'
.
├── jest                # unit test
│   └── preprocessor.js # jest transpiler
├── package.json        # list of dependencies, babel options
├── .eslintrc.json      # eslint configurations
├── src                 # the source code of the application
│   ├── api             # API end
│   ├── assets          # static assets
│   ├── client.jsx      # client entry
│   ├── components      # react components
│   ├── config.js       # application configurations
│   ├── containers      # react containers
│   ├── layouts         # react layouts
│   ├── lib             # utilities to realize it
│   ├── modules         # redux modules
│   ├── public          # static assets to serve
│   ├── redux           # redux store, middlewares
│   ├── routes          # routes
│   ├── server.jsx      # server entry
│   └── styles          # css code
└── tools               # build commands
    ├── config.js       # webpack and project settings
    ├── lib             # utilities for tasks
    ├── run.js          # task runner
    └── tasks           # build tasks
```
