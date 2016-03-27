**Preface**

*You don't need to follow all of this guideline!
I just suggest what I experienced.
If you have better way?
Please share the idea and make people stop suffering!*

## Webpack Configurations
Webpack configuration file is at `./tools/config.js`.
Default resolve path is `./src`.
So you can ref some files with relative path even if the file depth is too deep.

* Server entry file: `./src/server.jsx`.
* Client entry file: `./src/client.jsx`.
* HTML page template: `./src/components/Html/Html.jsx`

### Environment Variables
```js
if (__DEV__) {
  // this is in development mode
} else {
  // this is in production mode
}

console.log(__PORT__); // server port
```

## Core Utility
I brought some useful utility placed `./src/core`.

### Redux Store
```js
import { getStore } from 'core/context';

const store = getStore();
store.dispatch({
  type: 'SOME_ACTION_CONSTANT',
});

console.log(store.getState());
```

### Control Document Title

```js
import { setTitle, getTitle } from 'core/context';

setTitle('New Title');
console.log(getTitle()); // New Title
```

### Check Client Environments

```js
import {
  canUseDOM,
  canUseWorkers,
  canUseEventListeners,
  canUseViewport,
} from 'core/env';

if (canUseDOM) {
  // client ...
}
if (canUseWorkers) {
  // client and support workers ...
}
if (canUseEventListeners) {
  // client and support event listener ...
}
if (canUseViewport) {
  // client and support viewport ...
}
```

### Data Fetcher
It uses [superagent](https://www.npmjs.com/package/superagent) module to fetch data.
You can choose other universal http request client like [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch).

#### Basic Usage
```js
import fetch from 'core/fetch';

// find a user
async function getUserById(id) {
  const res = await fetch.get(`/users/${id}`);
  return res.body;
}

// update a user
async function updateUserById(id, data) {
  const res = await fetch.patch(`/users/${id}`, { data });
  return res.body;
}

// delete a user
async function deleteUserById(id, data) {
  const res = await fetch.del(`/users/${id})`);
  return res.body;
}
```

## Expand API

### Express middleware
In `./src/api` directory, you can add some api routes.

```js
// something.js
import { Router } from 'express';

const router = Router();

router
  .route('/users/:userId')
  .get((req, res) => { ... }))
  .patch((req, res) => { ... })
  .delete((req, res) => { ... }));

export default router;
```

```js
// In api.js
// you can bind like this
router.use(require('something').default);
```

[Here are more examples](http://expressjs.com/en/guide/routing.html)

### GraphQL
GraphQL directory is `./src/data` and `schema.js` is in the path.
You can customize Queries and Mutations.

## React Guideline
There are three folders to manage react components.
* `./src/components`: common components
* `./src/containers`: page components
* `./src/layouts`: layout components

### Route Configurations
Routes entry file is at `./src/routes/routes.jsx`.
To modify routes, you need to read [react-router reference](https://github.com/reactjs/react-router/tree/master/docs)

### React Component

#### Pure Component (Stateless Component)
```js
import React from 'react';

function PureComponent(...props) {
  return (
    <div>Render contents</div>
  );
}

PureComponent.propTypes = { ... };
PureComponent.defaultProps = { ... };
PureComponent.contextTypes = { ... };
```

*HMR doesn't support pure component.*

#### State Component
```js
import React, { Component } from 'react';

class StateComponent extends Component {
  static propTypes = { ... };
  static defaultProps = { ... };
  static contextTypes = { ... };

  componentWillMount() {
    // ...
  }

  componentDidMount() {
    // ...
  }

  componentWillUnmount() {
    // ...
  }

  render() {
    return (
      <div>Render contents.</div>
    );
  }
}
```
If you don't need state or lifecycle callback,
pure component is better.
It makes your application very light.

## Redux Guideline
* `./src/actions`: action creators
* `./src/constants`: action constants
* `./src/reducers`: reducers

Our store has `redux-thunk` middleware.
In development, `redux-logger` is included.
You can add middlewares. See `./src/redux/middlewares`.

### Basic Usage

```js
// ./src/constants/some.js
export const SOME_ACTION_CONSTANT = 'SOME_ACTION_CONSTANT';
```

```js
// ./src/actions/some.js
import { SOME_ACTION_CONSTANT } from 'constants/some';

export function someAction() {
  return {
    type: SOME_ACTION_CONSTANT,
    // you can pass some arguments
    payload: { ... },
    data: { ... },
  };
}
```

```js
// ./src/reducers/some.js
const initialState = {
  count: 0,
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SOME_ACTION_CONSTANT: {
      const { ... } = action.payload; // you can receive some arguments.
      return {
        ...state,
        count: state.count + 1,
      };
    }
    default: {
      return state;
    }
  }
}
```

```js
// ./src/reducers/index.js
export some from './some';
```

```js
// ./src/components/SomeComponent/SomeComponent.jsx
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { someAction } from 'actions/some';

function mapStateToProps(state) {
  return {
    count: state.some.count,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    someAction,
  }, dispatch);
}

function SomeComponent({ count, someAction }) {
  return (
    <div>
      <p>I am pure component. I did some action {count} times!</p>
      <button onClick={someAction}>Some Action</button>
    </div>
  );
}

SomeComponent.propTypes = {
  count: PropTypes.number,
  someAction: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SomeComponent);
```

### Server side prefetch data
Some components need to fetch data before serving to clients.
You can set `needs` property to pre-fetch data.

```js
SomeComponent.needs = [
  someAction,
];
```
