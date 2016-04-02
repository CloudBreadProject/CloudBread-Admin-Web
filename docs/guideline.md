# Guideline
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) is awesome.
The document will give you direction and inspiration.

## Directory Map
```
.
├── karma.config.js # Karma test to integrate webpack
├── package.json    # BabelJS configruations, list of dependencies, custom scripts
├── src
│ ├── actions       # reducer action creators
│ ├── client.jsx    # client entry
│ ├── components    # react components
│ ├── config.js     # general options
│ ├── constants     # redux action types
│ ├── core          # important utility
│ ├── index.html    # Web page template
│ ├── models        # table model
│ ├── reducers      # redux reducers
│ ├── redux         # react redux configurations
│ ├── routes        # react-router routes
│ └── styles        # common, universal stylesheets
├── tests           # unit test folder
│ ├── components
│ └── reducers
└── tools
    ├── config.js   # webpack configurations
    ├── lib         # development utility functions
    ├── run.js      # task runner
    └── tasks       # sub tasks such as build, bundle and copy, etc.
```
