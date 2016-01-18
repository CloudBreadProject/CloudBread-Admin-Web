# React Universal Starter Kit
![Dependency Badge](https://david-dm.org/Beingbook/react-universal-starter-kit.svg)

Quick start react package. See [this live](http://react-isomorphic.herokuapp.com/)

## Features

* Babel 6, ES2015 + ES7
* Webpack, development and production
* React 0.14.x, react-router
* HMR, reloading page through
* Karma, Mocha test
* Airbnb config eslint
* Sass like css loaders
* MaterialUI to provide better UI

## Installation

```sh
git clone https://github.com/Beingbook/react-isomorphic-starter-kit.git
cd react-isomorphic-starter-kit
npm i # alias to install
```

### Requirements

Node.js 4.x or 5.x

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

Run `tree -L 2 -I 'node_modules|build|.git|.DS_Store' -A -a` then you will see below:

```sh
.                   # Root
├── .csscomb.json   # css comb configurations
├── .editorconfig   # common editor configurations
├── .eslintrc.json  # eslint configurations
├── .gitignore
├── LICENSE.txt
├── README.md
├── karma.config.js # Karma test configurations
├── package.json    # dependency list
├── src             # application source code
│ ├── api           # api end point
│ ├── assets        # static files
│ ├── client.jsx    # client entry
│ ├── components    # react components such as Header, Loading, etc.
│ ├── config.js     # configuration such as api
│ ├── containers    # containers such as HomePage, ContentPage, etc.
│ ├── layouts       # layout such as commonLayout or ChannelLayout, etc.
│ ├── lib           # common library, utilities such as DOM, fetch, etc.
│ ├── modules       # Redux reducers, actions and constants
│ ├── public        # static files to serve through http or https
│ ├── redux         # redux store and middlewares
│ ├── routes        # route configurations
│ ├── server.jsx    # server entry
│ └── styles        # css codes
├── tests           # unit tests
│ └── layouts       # layout tests
└── tools           # build and deployment tools
    ├── .eslintrc.json
    ├── config.js   # webpack configurations
    ├── lib
    ├── run.js
    └── tasks       # build, deploy, serve, etc...
```
