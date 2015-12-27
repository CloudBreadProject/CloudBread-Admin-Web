# React Isomorphic Starter Kit

## Features
* babel6, full-presets, webpack
* react, react-router, async-props
* react-transform-hmr
* jest, enzyme
* airbnb config eslint
* sass like css loader

## Installation
```
git clone https://github.com/Beingbook/react-isomorphic-starter-kit.git
cd react-isomorphic-starter-kit
npm i
```

## Commands

### Build
```
npm run build
npm run build -- --release
```

### Development
```
npm run dev
```

### Lint
```
npm run lint
```

### Test
```
npm test
npm test -- --watch
```

### Deployment
```
# edit ./tools/deploy.sh before use this command
sudo npm run deploy
```

## Directory Map
* `src`: where you work, server and client entry here
* `tools`: build tasks
* `jest`: jest preprocessor
* `build`: will be created after build
* `node_modules`: node module dependencies
