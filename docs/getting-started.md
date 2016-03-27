## Installation

### Requirements
* Node.js 4.x or 5.x and NPM 3.3 or higher
* Git client

### Recommendations
* Text Editor (VI, Atom, Sublime Text or Visual Studio, etc...)

### Clone Repository
First time, you need to clone `react-kit` repository.

```sh
git clone https://github.com/Beingbook/react-universal-starter-kit.git -o react-kit -b master --single_branch ReactApp
```

Then you can install all dependencies in `package.json`

```sh
cd ReactApp
npm i # alias to install
```

## Usage

### Development

```sh
npm start
npm start -- --port=8080 # if you want to change the port
```

Never use this command for production service because this command will be executed via `babel-node` which makes performance slower.
To serve production application, you have to deploy or build it and execute `npm start` in the build folder.

### Build

```sh
npm run build
```

Build package for production.

### Lint

```sh
npm run lint
```

Eslint this package.

### CSS Comb

```sh
npm run csscomb
```

Make your css code beautiful.

### Deployment
You should edit `./tools/tasks/deploy.js` file before use this command.

```sh
npm run deploy
```

Basically this script deploys this package on git repository after build.
GitHub, Heroku, Azure, AWS and AppEngine doesn't matter, perhaps.

## Update
`starter-kit` repository can be updated.
If you want to apply updated repository follow this:

```sh
git checkout master
git fetch react-kit
git merge react-kit/master
npm i
```

Done all above?
Then now is time to develop something.
See [Development Guideline](./docs/guideline.md)
