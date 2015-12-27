# React Isomorphic Starter Kit
## Features
- babel6, full-presets, webpack
- react, react-router, async-props
- react-transform-hmr
- jest, enzyme for unit testing
- airbnb config eslint
- sass like css loader

## Installation

```sh
git clone https://github.com/Beingbook/react-isomorphic-starter-kit.git
cd react-isomorphic-starter-kit
npm i # alias to install
```

`postinstall` command in `package.json` will be executed after `npm install`.
I added it to deploy on Heroku.
If you don't want to use it, no matter to detach that command.

## Usage

### Build

```sh
npm run build
npm run build -- --release
```

### Development

```sh
# run watches lint and test file
npm run dev
```

### Serve

```sh
# just open browser without any lint and test watcher
npm run serve
```

### Lint

```sh
npm run lint
```

### Test

```sh
npm test
npm test -- --watch
```

### Deployment

```sh
# edit ./tools/deploy.sh before use this command
sudo npm run deploy
```

## Directory Map

```sh
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
By `tree -L 2 -I 'node_modules|build'`
