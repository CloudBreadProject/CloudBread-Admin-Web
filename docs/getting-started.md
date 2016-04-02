# Getting Started

## Installation

### Requirements

* Node.js 5 or newer
* NPM 3.3 or newer

### Let the build begins

#### 1. Clone Git Repository

Start of build is to clone the last repository of this project.

```sh
git clone -o cb-kit -b master --single-branch https://github.com/CloudBreadProject/CloudBread-Inspector CloudBread-Inspector
cd CloudBread-Inspector
```

#### 2. Install Dependencies

In this step, NPM will install every node modules in `dependencies` and `devDependencies` of `package.json`

```sh
npm install
```

#### 3. Run The Commands

[npm-scripts offical document](https://docs.npmjs.com/misc/scripts)
> npm supports the "scripts" property of the package.json script.
> Additionally, arbitrary scripts can be executed by running npm run-script <pkg> <stage>.
> Pre and post commands with matching names will be run for those as well (e.g. premyscript, myscript, postmyscript).

##### Development / Debug
```sh
npm start
```
Launch [WebpackDevServer](https://webpack.github.io/docs/webpack-dev-server.html) and
[BrowserSync](https://www.browsersync.io/) which helps your UI testing with multi browsers.

##### Production Build
```sh
npm run build
```
Build this project for production.
The result will be optimized javascript and stylesheets.

##### Lint
```sh
npm run lint
```
[What is "Linting"?](http://stackoverflow.com/questions/8503559/what-is-linting)
> lint was the name originally given to a particular program that flagged some suspicious and non-portable constructs (likely to be bugs) in C language source code.
> The term is now applied generically to tools that flag suspicious usage in software written in any computer language.

We use [ESLint](http://eslint.org/) with [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
to minimize and fix codes which can make bugs or errors.

##### Unit Test
```sh
npm test
```

[Unit testing](https://en.wikipedia.org/wiki/Unit_testing).
> In computer programming, unit testing is a software testing method by which individual units of source code, sets of one or more computer program modules together with associated control data, usage procedures, and operating procedures, are tested to determine whether they are fit for use.

Test environment is [Karma](https://karma-runner.github.io/0.13/index.html) and [Mocha](http://mochajs.org/).

### Update Project
Before you update project, you should save and commit all your works.

```sh
git checkout master
git fetch cb-kit
git merge cb-kit/master
npm install
```
