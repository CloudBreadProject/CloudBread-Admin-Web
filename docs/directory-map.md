# Directory Map

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
│ ├── actions       # redux action creators
│ ├── api           # api end point
│ ├── assets        # static files
│ ├── client.jsx    # client entry
│ ├── components    # react components such as Header, Loading, etc.
│ ├── config.js     # configuration such as api
│ ├── constants     # redux action constants
│ ├── containers    # containers such as HomePage, ContentPage, etc.
│ ├── layouts       # layout such as commonLayout or ChannelLayout, etc.
│ ├── core          # common library, utilities such as DOM, fetch, etc.
│ ├── data          # graphql schema
│ ├── reducers      # Redux reducers, actions and constants
│ ├── public        # static files to serve through http or https
│ ├── redux         # redux store and middlewares
│ ├── routes        # route configurations
│ ├── server.jsx    # server entry
│ └── styles        # css codes
├── tests           # unit tests
└── tools           # build and deployment tools
    ├── .eslintrc.json
    ├── config.js   # webpack configurations
    ├── lib
    ├── run.js
    └── tasks       # build, deploy, serve, etc...
```
